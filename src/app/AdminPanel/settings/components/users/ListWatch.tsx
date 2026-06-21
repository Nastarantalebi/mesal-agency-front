import CustomButton from "@/components/form/CustomButton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Eye } from "lucide-react";

interface Props {
  onClick?: () => void;
  showTool?: boolean;
}

const ListWatch = ({ onClick, showTool }: Props) => {
  const stopRowClick = (e: React.MouseEvent) => e.stopPropagation();

  const button = (
    <div onClick={stopRowClick}>
      <CustomButton
        className="bg-primary/20 hover:bg-primary/40"
        type="button"
        onClick={onClick}
      >
        <Eye className="h-5 w-5 cursor-pointer" strokeWidth={1.5} />
      </CustomButton>
    </div>
  );

  if (!showTool) return button;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent>
          <p>مشاهده</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ListWatch;
