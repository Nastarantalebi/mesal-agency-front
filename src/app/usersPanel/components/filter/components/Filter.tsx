import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { filterInitialValues, filterValidation } from "../fixtures/Validation";
import type { filterdata } from "../types/types";
import useFilterFields from "../hooks/useFilterFields";
import FormComponent from "@/_components/Form/Form";
import { Button } from "@/components/ui/button";

interface Props {}

const filter = ({}: Props) => {
  const form = useForm<filterdata>({
    resolver: zodResolver(filterValidation),
    defaultValues: filterInitialValues,
  });

  const content = useFilterFields({ form });

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
  };

  return (
    <div className="w-70">
      <FormComponent<filterdata>
        form={form}
        onSubmit={handleFilterSubmit}
        showSubmitButton={false}
        className="rounded-none! border-none"
      >
        <div className="col-span-full">
          {content}
          <div className="flex gap-1 mt-5">
            {" "}
            <Button type="submit" variant={"primary"}>
              اعمال فیلتر
            </Button>
            <Button
              type="button"
              className="border border-destructive bg-transparent text-destructive  hover:bg-destructive/10 "
            >
              حذف فیلتر
            </Button>
          </div>
        </div>
      </FormComponent>
    </div>
  );
};

export default filter;
