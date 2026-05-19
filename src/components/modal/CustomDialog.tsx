import { type JSX } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

interface Props {
  dialogContent: JSX.Element;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  dialogTitle: string;
  size?: "sm" | "lg" | "xl" | "xxl" | "xxxl";
}

const sizeClasses: Record<NonNullable<Props["size"]>, string> = {
  sm: "sm:max-w-sm",
  lg: "sm:max-w-lg",
  xl: "sm:max-w-xl",
  xxl: "sm:max-w-4xl",
  xxxl: "sm:max-w-8xl",
};

const CustomDialog = ({
  dialogContent,
  open,
  onOpenChange,
  dialogTitle,
  size = "lg", 
}: Props) => {
  const sizeClass = sizeClasses[size];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={`${sizeClass} w-full max-h-[90vh] overflow-y-auto hide-scrollbar`}
      >
        <DialogHeader>
          <DialogTitle className="mb-6">{dialogTitle}</DialogTitle>
        </DialogHeader>
        {dialogContent}
      </DialogContent>
    </Dialog>
  );
};

export default CustomDialog;
