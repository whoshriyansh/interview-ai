import bcrypt from "bcrypt";
import { ConnectDB } from "../db/ConnectDB.js";
import { UserModel } from "../models/User.model.js";
import type { Request, Response } from "express";
import {
  errorResponse,
  successResponse,
  validationResponse,
} from "../response/ApiResponse.js";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";
import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET || "your_super_secret_key";

/**
 * Handles user signup.
 * - Hashes the password before saving.
 * - Stores refresh token in httpOnly cookie.
 * - Returns user object (without password) and access token.
 */
export const SignUp = async (req: Request, res: Response) => {
  await ConnectDB();

  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return validationResponse(res, {
        fields: "username, email, password are required",
      });
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return errorResponse(res, 400, "User with email already exists");
    }

    const hashedPass = await bcrypt.hash(password, 10);
    const newUser = await UserModel.create({
      username,
      email,
      password: hashedPass,
    });

    // remove password before sending back user object
    const userObj = newUser.toObject();
    const { password: _, ...parsedObject } = userObj;

    const accessToken = generateAccessToken({
      id: newUser._id.toString(),
      username: username,
    });

    const refreshToken = generateRefreshToken({
      id: newUser._id.toString(),
      username: username,
    });

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return successResponse(res, 201, "User created successfully", {
      user: parsedObject,
      accessToken,
    });
  } catch (error: any) {
    return errorResponse(res, 500, "Something went wrong", error);
  }
};

/**
 * Handles user signin.
 * - Checks email + password.
 * - If valid, issues new tokens (same as signup).
 */
export const SignIn = async (req: Request, res: Response) => {
  await ConnectDB();

  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return validationResponse(res, {
        fields: "email and password are required",
      });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return errorResponse(res, 401, "Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return errorResponse(res, 401, "Invalid credentials");
    }

    const userObj = user.toObject();
    const { password: _, ...parsedObject } = userObj;

    const accessToken = generateAccessToken({
      id: user._id.toString(),
      username: user.username,
    });

    const refreshToken = generateRefreshToken({
      id: user._id.toString(),
      username: user.username,
    });

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return successResponse(res, 200, "Login successful", {
      user: parsedObject,
      accessToken,
    });
  } catch (error: any) {
    return errorResponse(res, 500, "Something went wrong", error);
  }
};

/**
 * Issues a new access token using refresh token.
 * - Called when access token expires.
 * - Reads refresh token from cookie, verifies it.
 * - If valid, returns a fresh access token.
 */
export const RefreshToken = async (req: Request, res: Response) => {
  const token = req.cookies.jwt;
  if (!token) {
    return errorResponse(res, 401, "No refresh token found");
  }

  try {
    const payload = jwt.verify(token, secretKey) as {
      id: string;
      username: string;
    };

    const newAccessToken = generateAccessToken({
      id: payload.id,
      username: payload.username,
    });

    return successResponse(res, 200, "New access token issued", {
      accessToken: newAccessToken,
    });
  } catch (err) {
    return errorResponse(res, 403, "Invalid or expired refresh token");
  }
};
