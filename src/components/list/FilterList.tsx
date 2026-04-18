import CustomButton from "@/components/form/CustomButton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FilterX } from "lucide-react";

interface Props {
  onClick: () => void;
}

const FilterList = ({ onClick }: Props) => {
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
              <FilterX className="h-5 w-5 cursor-pointer" strokeWidth={1.5} />
            </CustomButton>
          </TooltipTrigger>
          <TooltipContent>
            <p>فیلتر</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default FilterList;
