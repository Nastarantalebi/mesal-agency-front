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
import { useState } from "react";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
}

const filterModal = ({ open, onOpenChange, title }: Props) => {

  const form = useForm<filterdata>({
    resolver: zodResolver(filterValidation),
    defaultValues: filterInitialValues,
  });

  const [filters, setFilters] = useState<filterdata>()

  const { getAccommodations } = useAccommoation(filters);

  const content = useFilterFields({ form });

  const handleFilterSubmit = (values: filterdata) => {
    //  params.set("page", String(current_page ?? 1));

    // if (values?.name__contains)
    //   params.set("name__contains", values.name__contains);

    // if (values?.city__id) params.set("city__id", String(values.city__id));

    // if (values?.city__province__id)
    //   params.set("city__province__id", String(values.city__province__id));

    // if (values?.stars__gte) params.set("stars__gte", String(values.stars__gte));

    // if (values?.stars__lte) params.set("stars__lte", String(values.stars__lte));

    // // Join arrays with comma
    // if (values?.type__id?.length) {
    //   const cleaned = values.type__id.filter(Boolean);
    //   if (cleaned.length) params.set("type__id", cleaned.join(","));
    // }

    // if (values?.feature__id?.length) {
    //   const cleaned = values.feature__id.filter(Boolean);
    //   if (cleaned.length) params.set("feature__id", cleaned.join(","));
    // }
    setFilters(values)

  };
  console.log("data",getAccommodations.data)

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
