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
          <DialogTitle className="text-red-600 text-center">خطا</DialogTitle>
          <DialogDescription className="text-center leading-7">
            {message}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-4 flex justify-center">
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
