import { CourseDataProps } from "@/lib/validators"

export async function GetCourse() {
  const response = await fetch("https://fakestoreapi.com/products", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })

  const result:CourseDataProps[] = await response.json()

  return result
}