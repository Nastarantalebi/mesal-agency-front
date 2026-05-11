import { type JSX } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

interface Props {
  dialogContent: JSX.Element;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  dialogTtile: string;
}

const CustomDialog = ({ dialogContent, open, onOpenChange, dialogTtile }: Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-4xl overflow-y-scroll h-screen hide-scrollbar">
        <DialogHeader>
          <DialogTitle className="mb-6">{dialogTtile}</DialogTitle>
        </DialogHeader>
        {dialogContent}
      </DialogContent>
    </Dialog>
  );
};

export default CustomDialog;
