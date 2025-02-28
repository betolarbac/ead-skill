import { z } from "zod";

export const LoginSchema = z.object({
  username: z.string().min(1, "Usuário inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres")
})

export type LoginProps = z.infer<typeof LoginSchema>


export const CourseDataSchema = z.object({
  id: z.number(),
  title: z.string().min(1),
  price: z.number().min(1),
  rating: z.number().min(1),
  description: z.string().min(1),
  image: z.string().min(1),
  category: z.string(),
})

export type CourseDataProps = z.infer<typeof CourseDataSchema>