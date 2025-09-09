import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET || "your_super_secret_key";

interface UserPayload {
  id: string;
  username: string;
}

/**
 * Generates a short-lived access token (default: 10 minutes).
 *
 * @param payload - The user information to embed in the token (id, username).
 * @returns A signed JWT string to be used as an access token.
 */
export function generateAccessToken(payload: UserPayload): string {
  return jwt.sign(payload, secretKey, { expiresIn: "10m" });
}

/**
 * Generates a longer-lived refresh token (default: 7 days).
 *
 * Refresh tokens are typically stored securely (e.g. in a database or secure cookie)
 * and used to obtain new access tokens without requiring the user to log in again.
 *
 * @param payload - The user information to embed in the token (id, username).
 * @returns A signed JWT string to be used as a refresh token.
 */
export function generateRefreshToken(payload: UserPayload): string {
  return jwt.sign(payload, secretKey, { expiresIn: "7d" });
}
