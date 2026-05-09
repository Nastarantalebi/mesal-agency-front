import { CustomCollapsible } from "@/components/form/CustomCollapsible";
import type { filter, filterdata } from "../types/types";
import type { UseFormReturn } from "react-hook-form";
// import CustomCheckbox from "@/components/form/CustomCheckbox";
import useAccommodationType from "../services/useAccommodationType";
import CustomCheckBoxList from "@/components/form/CustomCheckBoxList";

interface Props {
  form: UseFormReturn<filterdata>;
}

const useFilterFields = ({ form }: Props) => {
  const { accommodationTypes } = useAccommodationType();

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
        <CustomCheckBoxList
          name="type__id"
          control={form.control}
          items={accommodationTypes.data}
        />
      ),
    },
  ];
  // console.log(form.watch());

  return (
    <div>
      {filterData.map((item) => (
        <CustomCollapsible content={item.content} title={item.title} />
      ))}
    </div>
  );
};

export default useFilterFields;
