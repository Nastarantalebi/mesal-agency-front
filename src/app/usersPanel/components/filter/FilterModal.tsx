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

import { useState } from "react";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
}

const filterModal = ({ open, onOpenChange, title}: Props) => {
  const form = useForm<filterdata>({
    resolver: zodResolver(filterValidation),
    defaultValues: filterInitialValues,
  });

  const content = useFilterFields({ form });
  const [errorOpen, setErrorOpen] = useState(false);

  const handleFilterSubmit = (data: filterdata) => {
    const params = new URLSearchParams();
    Object.entries(data).forEach(([key, value]) => {
      if (!value) return;

      if (Array.isArray(value)) {
        if (value.length > 0) {
          params.set(key, value.join(","));
        }
      } else {
        params.set(key, String(value));
      }
    });

    const queryString = params.toString();


    window.history.replaceState(null, "", `?${queryString}`);

    // setFilter(values);
  };

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
          errmessage="ثبت فیلتر با خطا مواجه شد"
          errorOpen={errorOpen}
          setErrorOpen={setErrorOpen}
        />
      </DialogContent>
    </Dialog>
  );
};

export default filterModal;
