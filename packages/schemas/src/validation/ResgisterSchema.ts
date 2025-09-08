import * as z from "zod";
import { emailSchema, passwordSchema, usernameSchema } from "./FieldsSchema.js";

export const RegisterSchema = z.object({
  username: usernameSchema,
  email: emailSchema,
  password: passwordSchema,
});
