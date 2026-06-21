import { XIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "../ui/dialog";
import { DialogContent } from "@radix-ui/react-dialog";
type TProps = {
  open: boolean;
  close: () => void;
  onSubmit?: () => void;
  children: ReactNode;
  title: string;
  submitText?: string;
  size?: "sm" | "md" | "lg" | "xl" | "xxl";
  cancelText?: string;
  variant_cancel?: any;
  variant_submit?: any;
  cancelBtn?: boolean;
};
export default function Modal({
  open,
  close,
  title,
  cancelText,
  children,
  //   size = "md",
  cancelBtn = true,
  onSubmit,
  submitText = "تایید",
  variant_submit = "outline-success",
  variant_cancel = "outline-destructive",
}: TProps) {
  return (
    <>
      <Dialog open={open} onOpenChange={close}>
        <DialogContent>
          <div className="flex flex-row items-center justify-between px-1">
            <DialogTitle>{title}</DialogTitle>
            <span onClick={close} className="p-2 cursor-pointer">
              <XIcon size={16} />
            </span>
          </div>
          <DialogDescription>{children}</DialogDescription>

          <DialogFooter>
            {!!cancelBtn && (
              <Button variant={variant_cancel} onClick={close}>
                {cancelText ?? "بستن"}
              </Button>
            )}
            {!!onSubmit && (
              <Button variant={variant_submit} onClick={onSubmit}>
                {submitText ?? "تایید"}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
