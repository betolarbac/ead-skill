import { columnsData } from "../_components/courseData/columnsData";
import CourseData from "../_components/courseData/courseData";
import { GetCourse } from "./action";

export default async function Dashboard() {
  const data = await GetCourse();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Cursos</h1>
      </div>
      <CourseData columns={columnsData} data={data} />
    </div>
  );
}
