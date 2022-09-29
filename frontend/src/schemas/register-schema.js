import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const registerSchema = z.object({
    email: z.string().min(1, { message: 'Email is required' }).email(),
    username: z.string().min(1, { message: 'Username is required' }),
    password: z.string().min(1, { message: 'Required' }),
    firstName: z.string().min(1, { message: 'Required' }),
    lastName: z.string().min(1, { message: 'Required' }),
    phone: z.string().min(1, { message: 'Required' }),
  });

  export default registerSchema