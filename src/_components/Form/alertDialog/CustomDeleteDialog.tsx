import Modal from "@/components/modal/Modal";
import { BadgeAlert } from "lucide-react";

interface props {
  isOpen: boolean;
  title: string;
  description: string;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
  confirmText?: string;
  cancelText?: string;
}

const CustomDeleteDialog = ({ isOpen, onClose, onConfirm }: props) => {
  return (
    <div>
      <Modal
        close={onClose}
        open={isOpen}
        title="حذف آیتم"
        cancelText="انصراف"
        submitText="حذف"
        variant_cancel="outline-dark"
        variant_submit="outline-danger"
        onSubmit={onConfirm}
      >
        <div className="flex flex-row items-center gap-2 text-center py-2">
          <div className="text-red-600">
            <BadgeAlert className="w-5 h-5" />
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            آیا از حذف این آیتم اطمینان دارید؟ این عمل قابل بازگشت نیست.
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default CustomDeleteDialog;
