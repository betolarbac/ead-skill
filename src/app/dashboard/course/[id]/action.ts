
import { CourseService } from "@/service/course/CourseService"

export async function GetCourseData(id: string) {
  const getCourseId = new CourseService();
  return await getCourseId.getCourseById(id);
}