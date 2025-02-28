"use client"
import { Button } from "@/components/ui/button";
import { CourseDataProps } from "@/lib/validators";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Eye, Pencil, Trash2, Zap } from "lucide-react";
import Image from "next/image";

export const columnsData: ColumnDef<CourseDataProps>[] = [
  {
    accessorKey: "image",
    header: "Imagem",
    cell: ({ row }) => (
      <div className="capitalize font-medium px-2 py-4 w-20 h-20">
        <Image
          alt="image Course"
          src={row.getValue("image")}
          width={48}
          height={48}
          className="h-12"
        />
      </div>
    ),
  },
  {
    accessorKey: "title",
    header: "Curso",
    cell: ({ row }) => {
      const title = row.getValue("title") as string;
      const truncatedTitle =
        title.length > 30 ? title.slice(0, 30) + "..." : title;
      const rating = row.getValue("rating") as { rate: number };

      return (
        <div className="flex items-center">
          <div className="capitalize font-medium px-2 py-4 truncate max-w-[200px]">
            {truncatedTitle}
          </div>
          {rating.rate >= 4.5 ? (
            <div className="bg-black w-fit p-0.5 rounded-[4px]">
              <Zap className="text-yellow-300 w-4 h-4" />
            </div>
          ) : null}
        </div>
      );
    },
  },
  {
    accessorKey: "category",
    header: "Categoria",
    cell: ({ row }) => (
      <div className=" font-medium px-2 py-4">{row.getValue("category")}</div>
    ),
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          className="cursor-pointer"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Preço
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));

      const formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(price);

      return <div className=" font-medium px-2 py-4">{formatted}</div>;
    },
  },
  {
    accessorKey: "rating",
    header: "Avaliação",
    sortingFn: (rowA, rowB, columnId) => {
      const ratingA =
        (rowA.getValue(columnId) as { rate: number })?.rate || 0;
      const ratingB =
        (rowB.getValue(columnId) as { rate: number })?.rate || 0;
      return ratingA - ratingB;
    },
    cell: ({ row }) => {
      const rating = row.getValue("rating") as { rate: number };

      return (
        <div className="flex items-center">
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(rating?.rate)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="ml-1">{rating?.rate}</span>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="text-end pr-2">Ações</div>,
    cell: ({}) => {
      return (
        <div className="flex justify-end gap-2">
          <Button variant="outline" size="icon">
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Pencil className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
]