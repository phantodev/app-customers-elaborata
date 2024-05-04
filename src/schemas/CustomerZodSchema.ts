import { z } from "zod";

export const CustomerZodSchema = z.object({
  name: z.string().min(6, { message: "Campo obrigatório" }),
  email: z.string().email({ message: "Campo obrigatório" }),
  phone: z.string().min(10, { message: "Campo obrigatório" }),
  address: z.string().min(6, { message: "Campo obrigatório" }),
  city: z.string().min(3, { message: "Campo obrigatório" }),
  state: z.string().min(2, { message: "Campo obrigatório" }),
  postal_code: z.string().min(6, { message: "Campo obrigatório" }),
  country: z.string().min(3, { message: "Campo obrigatório" }).optional(),
});
