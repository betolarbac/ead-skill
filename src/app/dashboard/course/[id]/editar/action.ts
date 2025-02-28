import { CourseDataProps } from "@/lib/validators";
import { CourseService } from "@/service/course/CourseService";

export async function UpdateCourseInfo(data: CourseDataProps): Promise<CourseDataProps> {
  const courseService = new CourseService();
  return await courseService.updateCourse(data);
}