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
import { useAccommoation } from "../../services/useAccommoation";
import { useState, type Dispatch, type SetStateAction } from "react";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  setFilter: Dispatch<SetStateAction<filterdata | undefined>>;
}

const filterModal = ({ open, onOpenChange, title, setFilter }: Props) => {
  const form = useForm<filterdata>({
    resolver: zodResolver(filterValidation),
    defaultValues: filterInitialValues,
  });

  const content = useFilterFields({ form });

  const handleFilterSubmit = (values: filterdata) => {
    setFilter(values);
  };
  // console.log("data",getAccommodations.data)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-96 overflow-y-scroll max-h-screen hide-scrollbar">
        <DialogHeader>
          <DialogTitle className="mb-6">{title}</DialogTitle>
        </DialogHeader>
        <FormComponent
          form={form}
          handleSubmit={handleFilterSubmit}
          children={content}
          buttonText="اعمال فیلتر"
        />
      </DialogContent>
    </Dialog>
  );
};

export default filterModal;
