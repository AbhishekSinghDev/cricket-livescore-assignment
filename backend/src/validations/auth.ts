import { z } from "zod";

const signupSchema = z.object({
  email: z.string().email({ message: "invalid email address." }),
  password: z.string().min(8, { message: "password must be of 8 characters." }),
});

const loginSchema = z.object({
  email: z.string().email({ message: "invalid email address." }),
  password: z.string().min(8, { message: "invalid password." }),
});

export { signupSchema, loginSchema };
