import { z } from "zod";
import {
  formatPhoneNumber,
  formatPhoneNumberIntl,
  isPossiblePhoneNumber,
} from "react-phone-number-input";

const registerSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email(),
  /* username: z.string().min(1, { message: "Username is required" }) /* 
    .regex(new RegExp("^[a-zA-Z0-9]$"), {
      message: "Can't contain special characters",
    }) , */
  password: z
    .string()
    .min(1, { message: "Required" })
    .regex(/[0-9]/, {
      message: "Must contain at least one number",
    })
    .regex(/[a-z]/, {
      message: "Must contain at least one lowercase letter",
    })
    .regex(/[A-Z]/, {
      message: "Must contain at least one uppercase letter",
    })
    .regex(/[$&+,:;=?@#|'<>.^*()%!-]/, {
      message: "Must contain at least one special character",
    }),
  firstName: z.string().min(1, { message: "Required" }) /* 
    .regex(new RegExp("^[a-zA-Z0-9]$"), {
      message: "Can't contain special characters",
    }) */,
  lastName: z.string().min(1, { message: "Required" }),
  /* .regex(new RegExp("^[a-zA-Z0-9]$"), {
      message: "Can't contain special characters",
    }) */
  avatar: z
    .instanceof(File)
    .refine((file) => file.size <= 500000, `Max file size is 5MB.`)
    .refine(
      (file) =>
        ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
          file.type
        ),
      ".jpg, .jpeg, .png and .webp files are accepted."
    ),
  phone: z
    .string()
    .min(1, { message: "Required" })
    .refine((val) => isPossiblePhoneNumber(val), {
      message: "Must be a valid phone number",
    }),
});

export default registerSchema;
