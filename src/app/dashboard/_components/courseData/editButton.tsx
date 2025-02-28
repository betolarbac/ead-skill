"use client";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";

interface DetailsButtonProps {
  id: number;
}

export default function EditButton({id}: DetailsButtonProps) {
  const router = useRouter();

  return (
    <Button
      variant="outline"
      size="icon"
      className="cursor-pointer"
      onClick={() => router.push(`/dashboard/course/${id}/editar`)}
    >
      <Pencil className="h-4 w-4" />
    </Button>
  );
}
