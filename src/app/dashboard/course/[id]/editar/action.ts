import { CourseDataProps } from "@/lib/validators"

export async function UpdateCourseInfo(data: CourseDataProps) {
  const response = await fetch(`https://fakestoreapi.com/products/${data.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })

  const updatedCourse = await response.json()

  return updatedCourse
}