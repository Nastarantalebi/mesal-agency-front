import CustomButton from "@/components/form/CustomButton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ImagePlus } from "lucide-react";

interface Props {
  onClick: () => void;
}

const ListImage = ({ onClick }: Props) => {
  const stopRowClick = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <div onClick={stopRowClick}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div onClick={stopRowClick}>
              <CustomButton
                className="bg-primary/20 hover:bg-primary/40 "
                type="button"
                onClick={onClick}
              >
                <ImagePlus
                  className="h-5 w-5 cursor-pointer"
                  strokeWidth={1.5}
                />
              </CustomButton>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>افزودن عکس</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default ListImage;
