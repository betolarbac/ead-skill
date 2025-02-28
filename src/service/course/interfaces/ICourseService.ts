import { CourseDataProps } from "@/lib/validators";

export interface ICourseService {
  getAllCourses(): Promise<CourseDataProps[]>;
  getCourseById(id: string): Promise<CourseDataProps>;
  updateCourse(data: CourseDataProps): Promise<CourseDataProps>;
}