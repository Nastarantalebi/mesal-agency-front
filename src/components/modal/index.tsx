import { type JSX } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

interface Props {
  dialogContent: JSX.Element;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  dialogTitle: string;
  size?: "sm" | "lg" | "xl" | "xxl";
}

const sizeClasses = {
  sm: "max-w-sm",
  lg: "max-w-lg",
  xl: "max-w-xl",
  xxl: "max-w-2xl",
};

const CustomDialog = ({
  dialogContent,
  open,
  onOpenChange,
  dialogTitle,
  size = "lg",
}: Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={`${sizeClasses[size]} w-full overflow-y-auto max-h-screen hide-scrollbar`}
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
