import { CourseDataProps } from "@/lib/validators"

export async function GetCourseData(id: string) {
  const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })

  const result:CourseDataProps = await response.json()

  return result
}