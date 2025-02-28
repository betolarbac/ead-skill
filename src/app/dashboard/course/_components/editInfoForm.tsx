"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CourseDataProps, CourseDataSchema } from "@/lib/validators";
import { UpdateCourseInfo } from "../[id]/editar/action";
import Image from "next/image";
import { Loader } from "lucide-react";
import { toast } from "sonner";

interface EditInfoFormProps {
  data: CourseDataProps;
}

export function EditInfoForm({ data }: EditInfoFormProps) {
  const form = useForm<CourseDataProps>({
    resolver: zodResolver(CourseDataSchema),
    defaultValues: {
      id: data.id,
      title: data.title,
      description: data.description,
      price: data.price,
      category: data.category,
      rating: {
        rate: data.rating.rate,
        count: data.rating.count,
      },
      image: data.image,
    },
  });

  async function handleSubmit(newData: CourseDataProps) {
    try {
      const response = await UpdateCourseInfo({ ...newData, id: data.id });

      if (response) {
        toast.success("Curso editado com sucesso");
      }

    } catch (error) {
      console.log(error);
      toast.error("Erro ao editar curso");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 items-baseline gap-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome do Curso</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  O nome do produto não pode ter mais de 30 caracteres.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categoria</FormLabel>
                <Select
                  disabled={true}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={data.category}>{data.category}</SelectItem>
                  </SelectContent>
                </Select>

                <FormDescription>
                  A categoria não pode ser alterada durante a edição.
                </FormDescription>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 items-baseline gap-6">
          <div className="">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preço</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      {...field}
                      className="mb-4"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea rows={5} {...field} className="h-72" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL da Imagem</FormLabel>
                <div className="space-y-2">
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="https://exemplo.com/imagem.jpg"
                    />
                  </FormControl>
                  <div className="h-80 w-80 rounded-md border overflow-hidden bg-muted flex items-center justify-center">
                    {field.value ? (
                      <Image
                        width={300}
                        height={300}
                        src={field.value || "/placeholder.svg"}
                        alt="Prévia da imagem"
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      <span className="text-xs text-muted-foreground">
                        Sem imagem
                      </span>
                    )}
                  </div>
                </div>
                <FormDescription>
                  Insira a URL de uma imagem para o produto
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="cursor-pointer min-w-32"
        >
          {form.formState.isSubmitting ? (
            <Loader className="animate-spin" />
          ) : (
            "Salvar Produto"
          )}
        </Button>
      </form>
    </Form>
  );
}
