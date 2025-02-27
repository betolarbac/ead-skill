import { z } from "zod";

export const LoginSchema = z.object({
  username: z.string().min(1, "Usuário inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres")
})

export type LoginProps = z.infer<typeof LoginSchema>