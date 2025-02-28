"use client";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { useRouter } from "next/navigation";

interface DetailsButtonProps {
  id: number;
}

export default function DetailsButton({id}: DetailsButtonProps) {
  const router = useRouter();

  return (
    <Button
      variant="outline"
      size="icon"
      className="cursor-pointer"
      onClick={() => router.push(`/dashboard/course/${id}`)}
    >
      <Eye className="h-4 w-4" />
    </Button>
  );
}
