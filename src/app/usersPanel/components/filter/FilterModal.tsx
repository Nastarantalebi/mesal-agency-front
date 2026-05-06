import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import type { filterdata } from "./types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { filterInitialValues, filterValidation } from "./fixtures/Validation";
import FormComponent from "@/components/form/FormComponent";
import useFilterFields from "./hooks/useFilterFields";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
}

const filterModal = () => {
  const form = useForm<filterdata>({
    resolver: zodResolver(filterValidation),
    defaultValues: filterInitialValues,
  });

  const content = useFilterFields({form});

  const handleFilterSubmit = () => {};

  return (
    <div>
      <FormComponent
        form={form}
        handleSubmit={handleFilterSubmit}
        children={content}
      />
      {/* <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-4xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="mb-6">{title}</DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog> */}
    </div>
  );
};

export default filterModal;
