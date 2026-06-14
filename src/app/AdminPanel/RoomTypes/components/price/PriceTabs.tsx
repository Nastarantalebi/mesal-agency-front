import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GlobalPriceInputs from "./GlobalPriceInputs";
import GlobalPriceInputRange from "./GlobalPriceInputRange";
import type { UseFormReturn } from "react-hook-form";
import type { TCRoomTypePrices } from "../../types";

interface Props {
  form: UseFormReturn<TCRoomTypePrices, any, TCRoomTypePrices>;
}

const PriceTabs = ({ form }: Props) => {
  const items = [
    {
      title: "انتخاب روز",
      component: <GlobalPriceInputs form={form} />,
    },
    {
      title: "انتخاب رنج تاریخ",
      component: <GlobalPriceInputRange form={form} />,
    },
  ];

  return (
    <Tabs defaultValue={items[0].title} className="w-full">
      <TabsList className="w-full">
        {items.map((item) => (
          <TabsTrigger
            key={item.title}
            value={item.title}
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-6 py-3 text-base"
          >
            {item.title}
          </TabsTrigger>
        ))}
      </TabsList>
      <div className="py-2">
        {items.map((item) => (
          <TabsContent key={item.title} value={item.title}>
            {item.component}
          </TabsContent>
        ))}
      </div>
    </Tabs>
  );
};

export default PriceTabs;
