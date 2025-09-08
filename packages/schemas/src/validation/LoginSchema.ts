import * as z from "zod";
import { emailSchema, passwordSchema } from "./FieldsSchema.js";

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});
