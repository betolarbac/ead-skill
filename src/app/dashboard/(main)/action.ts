import { CourseDataProps } from "@/lib/validators";
import { CourseService } from "@/service/course/CourseService";

export async function GetCourse(): Promise<CourseDataProps[]> {
  const courseService = new CourseService();
  return await courseService.getAllCourses();
}