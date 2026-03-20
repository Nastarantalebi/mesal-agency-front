import CustomButton from "@/components/form/CustomButton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

type Props = {
  open: boolean;
  message: string;
  onAcknowledge: () => void;
  onOpenChange: (open: boolean) => void;
  buttonTitle?: string;
  dialogTitle?:string;
};

export default function FormErrorModal({
  open,
  message,
  onAcknowledge,
  onOpenChange,
  buttonTitle= "متوجه شدم",
  dialogTitle= "خطا",
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm z-1000">
        <DialogHeader>
          <DialogTitle className="text-red-600 text-center">{dialogTitle}</DialogTitle>
          <DialogDescription className="text-center leading-7">
            {message}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-4 flex justify-center">
          <DialogClose asChild>
            <CustomButton
              type="button"
              onClick={onAcknowledge}
            >
              {buttonTitle}
            </CustomButton>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
