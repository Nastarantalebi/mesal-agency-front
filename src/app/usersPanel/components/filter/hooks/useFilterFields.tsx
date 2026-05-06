import { CustomCollapsible } from "@/components/form/CustomCollapsible";
import type { filter, filterdata } from "../types/types";
import type { UseFormReturn } from "react-hook-form";
import CustomCheckbox from "@/components/form/CustomCheckbox";
import useAccommodationType from "../services/useAccommodationtype";

interface Props {
  form: UseFormReturn<filterdata>;
}

const useFilterFields = ({ form }: Props) => {
  const { accommodationTypes } = useAccommodationType();

  console.log(accommodationTypes.data);
  const filterData: filter[] = [
    // {
    //   title: "تعداد نفرات",
    //   content: (
    //     <AddRemoveButtonTemplate
    //       name="num_adults"
    //       label="تعدات نفرات"
    //       control={form.control}
    //     />
    //   ),
    // },
    {
      title: "نوع اقامتگاه",
      content: (
        <>
          {accommodationTypes.data?.map((item) => (
            <CustomCheckbox
              key={item.id}
              name="type__id"
              label={item.name}
              control={form.control}
            />
          ))}
        </>
      ),
    },
  ];

  return (
    <div>
      {filterData.map((item) => (
        <CustomCollapsible content={item.content} title={item.title} />
      ))}
    </div>
  );
};

export default useFilterFields;
