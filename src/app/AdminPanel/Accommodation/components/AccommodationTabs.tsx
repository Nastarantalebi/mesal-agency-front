import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import AccommodationForm from "./AccommodationForm";
import AccommodationPhotoes from "../../AcoommodationPhotoes/components/AccommodationPhotoes";
import RoomType from "../../RoomTypes/components/roomType";

const AccommodationTabs = ({
  accommodationId,
}: {
  accommodationId: string;
}) => {
  const items = [
    {
      title: "اطلاعات اولیه",
      component: <AccommodationForm accommodationId={accommodationId} />,
    },
    {
      title: "ویژگی ها",
    },
    {
      title: "تصاویر اقامتگاه",
      component: <AccommodationPhotoes accommodationId={accommodationId} />,
    },
    {
      title: "نوع اتاق",
      component: <RoomType accommodationId={accommodationId} />,
    },
  ];
  return (
    <Tabs className="w-full pr-20">
      <TabsList className="">
        {" "}
        {/* Change TabsList background */}
        {items.map((item) => (
          <TabsTrigger
            value={item.title}
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-6 py-3 text-base"
          >
            {item.title}
          </TabsTrigger>
        ))}
      </TabsList>
      {items.map((item) => (
        <TabsContent key={item.title} value={item.title}>
          {item.component}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default AccommodationTabs;
