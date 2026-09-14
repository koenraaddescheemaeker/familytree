import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface AiLabelProps {
  className?: string;
  size?: "sm" | "md";
}

const AiLabel = ({ className, size = "sm" }: AiLabelProps) => {
  return (
    <div
      className={cn(
        "absolute flex items-center gap-1 bg-black/70 text-white rounded px-2 py-1 z-10",
        size === "sm" ? "text-xs" : "text-sm",
        className
      )}
    >
      <Sparkles className={cn("text-amber-400", size === "sm" ? "w-3 h-3" : "w-4 h-4")} />
      <span>Gekleurd met AI</span>
    </div>
  );
};

export default AiLabel;
