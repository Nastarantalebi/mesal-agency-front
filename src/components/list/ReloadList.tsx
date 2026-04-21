import CustomButton from "@/components/form/CustomButton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { RefreshCcw } from "lucide-react";

interface Props {
  onClick: () => void;
}

const ReloadList = ({ onClick }: Props) => {
  const stopRowClick = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <div onClick={stopRowClick}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <CustomButton
              className="bg-primary/20 hover:bg-primary/40"
              type="button"
              onClick={onClick}
            >
              <RefreshCcw className="h-5 w-5 cursor-pointer" strokeWidth={1.5} />
            </CustomButton>
          </TooltipTrigger>
          <TooltipContent>
            <p>بارگزاری مجدد</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default ReloadList;
