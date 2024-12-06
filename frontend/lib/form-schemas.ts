import { z } from "zod";

const adminLoginFormSchema = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z.string().min(8, {
    message: "Must be of length 8.",
  }),
});

export { adminLoginFormSchema };
