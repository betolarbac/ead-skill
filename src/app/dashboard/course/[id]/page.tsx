import React from "react";
import { GetCourseData } from "./action";
import { Button } from "@/components/ui/button";
import { Edit, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import BackButton from "../_components/backButton";

export default async function CoursePage({params,}: {params: { id: string };}) {
  const {id } = await params;
  const courseDetails = await GetCourseData(id);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <BackButton />
          <h1 className="text-2xl font-bold">Detalhes do Curso</h1>
        </div>
        <Button >
          <Edit className="h-4 w-4 mr-2" />
          Editar Curso
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <h3>{courseDetails?.title}</h3>
            {courseDetails.rating.rate >= 4.5 ? (
            <div className="bg-black w-fit p-0.5 rounded-[4px]">
              <Zap className="text-yellow-300 w-6 h-6" />
            </div>
          ) : null}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-64 h-64 bg-muted rounded-md flex items-center justify-center overflow-hidden">
              <Image
                src={courseDetails?.image }
                alt={courseDetails?.title}
                className="max-w-full max-h-full object-contain"
                width={256}
                height={256}
              
              />
            </div>
            <div className="space-y-4 flex-1">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Categoria</h3>
                <p className="text-lg font-medium">{courseDetails?.category}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Preço</h3>
                <p className="text-lg font-medium">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(courseDetails?.price)}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Avaliação</h3>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(courseDetails?.rating?.rate || 0) ? "text-yellow-400" : "text-gray-300"}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-lg font-medium">{courseDetails?.rating?.rate || 0} ({courseDetails?.rating?.count || 0} avaliações)</span>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Descrição</h3>
                <p className="text-base">{courseDetails?.description}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
