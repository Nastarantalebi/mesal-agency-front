import useMe from "@/app/login/services/useMe";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Props {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: string;
}

const UserProfile = ({ open, onOpenChange, title }: Props) => {
    const {data} = useMe()
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-4xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="mb-6">{title}</DialogTitle>
          <div>{data?.mobile}</div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default UserProfile;
