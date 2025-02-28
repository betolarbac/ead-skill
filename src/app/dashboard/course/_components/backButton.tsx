"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <Button variant="outline" size="icon" className="cursor-pointer" onClick={() => router.push("/dashboard")}>
      <ArrowLeft className="h-4 w-4" />
    </Button>
  );
}
