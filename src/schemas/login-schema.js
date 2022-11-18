import { z } from "zod";

const loginSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email(),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[0-9]/, {
      message: "Must contain at least one number",
    })
    .regex(/[a-z]/, {
      message: "Must contain at least one lowercase letter",
    })
    .regex(/[A-Z]/, {
      message: "Must contain at least one uppercase letter",
    })
    .regex(/[$&+,:;=?@#|'<>.^*()%!_-]/, {
      message: "Must contain at least one special character",
    }),

  /* .refine((val) => /[0-9]/.test(val), {
      path: ["oneNumber"],
      message: "Must contain at least one number",
    })
    .refine((val) => /[a-z]/.test(val), {
      path: ["oneLowerCase"],
      message: "Must contain at least one lowercase letter",
    }), */ //TODO Use this for ease of making an strength meter
});

export default loginSchema;
