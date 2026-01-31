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
  onAcknowledge: () => void;        // مثلا retry یا فقط close
  onOpenChange: (open: boolean) => void; // برای بستن با Esc/کلیک بیرون
};

export default function FormErrorModal({
  open,
  message,
  onAcknowledge,
  onOpenChange,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-red-600 text-right">خطا</DialogTitle>
          <DialogDescription className="text-right leading-7">
            {message}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <CustomButton
              ispending={false}
              type="button"
              onClick={onAcknowledge}
            >
              متوجه شدم
            </CustomButton>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
