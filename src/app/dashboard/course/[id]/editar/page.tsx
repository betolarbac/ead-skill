import BackButton from "../../_components/backButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GetCourseData } from "../action";
import { EditInfoForm } from "../../_components/editInfoForm";


export default async function CoursePage({params,}: {params: { id: string };}) {
  const { id } = await params;
  const courseInfo = await GetCourseData(id)


  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <BackButton />
        <h1 className="text-2xl font-bold">Editar Curso</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informações do Curso</CardTitle>
        </CardHeader>
        <CardContent>
          <EditInfoForm data={courseInfo}  />
        </CardContent>
      </Card>
    </div>
  )
}
