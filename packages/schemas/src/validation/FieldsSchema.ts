import * as z from "zod";

export const usernameSchema = z
  .string()
  .min(4, "Username must be at least 4 characters long")
  .max(15, "Username cannot exceed 15 characters")
  .regex(
    /^[a-zA-Z0-9_]+$/,
    "Username can only contain letters, numbers, and underscores"
  )
  .trim();

export const emailSchema = z
  .string()
  .regex(
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    "Please provide a correct email"
  );

export const passwordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters long." })
  .regex(/[A-Z]/, {
    message: "Password must contain at least one uppercase letter.",
  })
  .regex(/[a-z]/, {
    message: "Password must contain at least one lowercase letter.",
  })
  .regex(/[0-9]/, { message: "Password must contain at least one number." })
  .regex(/[^A-Za-z0-9]/, {
    message: "Password must contain at least one special character.",
  });
