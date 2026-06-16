import { CustomCollapsible } from "@/components/form/CustomCollapsible";
import type { filter, filterdata } from "../types/types";
import type { UseFormReturn } from "react-hook-form";
// import CustomCheckbox from "@/components/form/CustomCheckbox";
import CustomCheckBoxList from "@/components/form/CustomCheckBoxList";
import CustomStarInput from "@/components/form/CustomStarInput";
import useAccommodationType from "../services/useAccommodationTypes";

interface Props {
  form: UseFormReturn<filterdata>;
}

const useFilterFields = ({ form }: Props) => {
  const { accommodationTypes, accommodatioFeatureList } =
    useAccommodationType();

  const updatedAccommodatioFeatureList = accommodatioFeatureList.data?.map(
    (item) => ({
      id: item.id,
      name: item.title as string,
    }),
  );

  const filterData: filter[] = [
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
    {
      title: "ویژگی های اقامتگاه",
      content: (
        <CustomCheckBoxList
          name="feature__id"
          control={form.control}
          items={updatedAccommodatioFeatureList}
        />
      ),
    },
    {
      title: "چند ستاره؟",
      content: <CustomStarInput name="stars__gte" control={form.control} />,
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
