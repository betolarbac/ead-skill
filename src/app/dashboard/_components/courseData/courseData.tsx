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
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CourseDataProps } from "@/lib/validators";
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
  columns: ColumnDef<CourseDataProps>[];
  data: CourseDataProps[];
};
export default function CourseData({ columns, data }: CourseData) {
  const [sorting, setSorting] = React.useState<SortingState>([
    { id: "rating", desc: true },
  ]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

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
