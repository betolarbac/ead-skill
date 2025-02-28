import { CourseDataProps } from "@/lib/validators";
import { ICourseService } from "./interfaces/ICourseService";

export class CourseService implements ICourseService {
  private readonly baseUrl = "https://fakestoreapi.com/products";

  async getAllCourses(): Promise<CourseDataProps[]> {
    const response = await fetch(this.baseUrl, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch courses: ${response.statusText}`);
    }

    return response.json();
  }

  async getCourseById(id: string): Promise<CourseDataProps> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch course ${id}: ${response.statusText}`);
    }

    return response.json();
  }

  async updateCourse(data: CourseDataProps): Promise<CourseDataProps> {
    const response = await fetch(`${this.baseUrl}/${data.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Failed to update course ${data.id}: ${response.statusText}`);
    }

    return response.json();
  }
}