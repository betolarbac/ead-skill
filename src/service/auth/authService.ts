import { LoginProps } from "@/lib/validators";

export async function login(data: LoginProps) {
  const response = await fetch("https://fakestoreapi.com/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Credenciais inválidas");
  }

  const result = await response.json();
  localStorage.setItem("jwt", result.token);

  return result;
}
