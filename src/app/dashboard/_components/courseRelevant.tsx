import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Zap } from "lucide-react";

export default function CourseRelevant() {
  return (
    <HoverCard>
      <HoverCardTrigger>
        <div data-testid="hover-trigger" className="bg-black w-fit p-0.5 rounded-[4px]">
          <Zap data-testid="zap-icon" className="text-yellow-300 w-4 h-4" />
        </div>
      </HoverCardTrigger>
      <HoverCardContent>
        <p className="text-sm">
          Seu curso possui alta relevância nas avaliações
        </p>
      </HoverCardContent>
    </HoverCard>
  );
}
