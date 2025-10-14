import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FloatingButtonProps {
  onClick: () => void;
  label?: string;
}

export function FloatingButton({ onClick, label = "Nuevo" }: FloatingButtonProps) {
  return (
    <div className="fixed bottom-6 right-6">
      <Button
        size="lg"
        onClick={onClick}
        className="shadow-lg shadow-primary/30 rounded-full px-5"
      >
        <Plus className="mr-2 h-5 w-5" /> {label}
      </Button>
    </div>
  );
}
