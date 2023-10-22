import { Editor } from "@tiptap/react";
import { Button } from "./ui/button";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  editor: Editor | null;
  disabled: boolean;
  onClick: () => boolean | undefined;
  type?: string;
  typeOptions?: { [key: string]: number };
  icon: LucideIcon;
}

function TiptapToggle({
  editor,
  disabled,
  onClick,
  type,
  typeOptions,
  icon: Icon,
}: Props) {
  return (
    <Button
      variant={"ghost"}
      size={"icon"}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        type &&
          editor?.isActive(type, typeOptions) &&
          "rounded bg-gray-200 hover:bg-gray-200",
      )}
    >
      <Icon className="h-6 w-6" />
    </Button>
  );
}
export default TiptapToggle;
