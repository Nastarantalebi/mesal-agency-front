import { useForm } from "react-hook-form";
import type { accommodationSearch } from "../types";
import { Form } from "@/components/ui/form";
import formTypes from "@/components/form/FormInputTypes";
import CustomButton from "@/components/form/CustomButton";
import useSearchFields from "../fixtures/useSearchFields";
import { useState } from "react";
// import useSearch from "../services/useSearch";
import { shamsiToMiladi } from "@/components/form/DateConverter";

export default function SearchForm() {

  const form = useForm<accommodationSearch>();
  const { searchFields } = useSearchFields();
  const [filters, setFilters] = useState({
    start: "",
    end: "",
    num_adults: "",
    province: "",
  });
  // const { getSearch } = useSearch(filters);

  const handleSubmit = (formData: accommodationSearch) => {
    
    setFilters({
      start: shamsiToMiladi(formData.start ?? ""),
      end: shamsiToMiladi(formData.end ?? ""),
      num_adults: formData.num_adults ?? "",
      province: formData.province ?? "",
    });

    console.log("Filters", filters)
  };

  return (
    <div className="bg-white rounded-full px-10 py-5">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-row justify-center gap-5 items-center"
        >
          {searchFields.map((item) => (
            <div
              key={String(item.name)}
              className={item.className || "col-span-1"}
            >
              {formTypes<accommodationSearch>(item, form.control)}
            </div>
          ))}
          <CustomButton className="rounded-full mt-1" type="submit">
            جست و جو
          </CustomButton>
        </form>
      </Form>
    </div>
  );
}
