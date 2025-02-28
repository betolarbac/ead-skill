"use client";
import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  Pencil,
  Search,
  Trash2,
  Zap,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CourseDataProps } from "@/lib/validators";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type CourseData = {
  data: CourseDataProps[];
};

export default function CourseData({ data }: CourseData) {
  const [sorting, setSorting] = React.useState<SortingState>([
    { id: "rating", desc: true },
  ]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const columns: ColumnDef<CourseDataProps>[] = [
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
  ];

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  });
  return (
    <div className="w-full">
      <div className="flex row justify-between gap-4 mt-4">
        <div className="relative flex-1/2">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar Curso..."
            value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("title")?.setFilterValue(event.target.value)
            }
            className="max-w-sm pl-8 rounded-sm"
          />
        </div>
        <Select
          value={
            (table.getColumn("category")?.getFilterValue() as string) ?? ""
          }
          onValueChange={(e) =>
            table
              .getColumn("category")
              ?.setFilterValue(e === "all" ? undefined : e)
          }
        >
          <SelectTrigger className="p-2 border rounded-sm w-auto cursor-pointer gap-4">
            <SelectValue placeholder="Selecione uma Categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Categorias</SelectLabel>
              <SelectItem value="all">Todos os Cursos</SelectItem>
              {Array.from(new Set(data.map((item) => item.category))).map(
                (category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                )
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="rounded-sm border mt-6">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Sem Cursos Encontrados
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-center space-x-2 py-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="default"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="cursor-pointer"
          >
            <ChevronLeft />
            Previous
          </Button>
          {Array.from({ length: table.getPageCount() }).map((_, index) => (
            <Button
              key={index}
              variant="outline"
              size="default"
              onClick={() => table.setPageIndex(index)}
              className={
                table.getState().pagination.pageIndex === index
                  ? "bg-primary text-white cursor-pointer hover:bg-primary/90 hover:text-white"
                  : "cursor-pointer"
              }
            >
              {index + 1}
            </Button>
          ))}
          <Button
            variant="outline"
            size="default"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="cursor-pointer"
          >
            Next
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
