import { z } from "zod";
const productSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  category: z.string().min(1, { message: "Category is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  price: z
    .number({
      required_error: "Price is required",
      invalid_type_error: "Price must be a number",
    })
    .positive({ message: "Must be a positive value" }),
  stock: z
    .number({
      required_error: "Stock is required",
      invalid_type_error: "Stock must be a number",
    })
    .nonnegative({ message: "Must be a 0 at least" }),
  picture: z
    .instanceof(File, { message: "Image is required" })
    .refine((file) => file.size <= 500000, `Max file size is 5MB.`)
    .refine(
      (file) =>
        ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
          file.type
        ),
      ".jpg, .jpeg, .png and .webp files are accepted."
    ),
});
export default productSchema;
