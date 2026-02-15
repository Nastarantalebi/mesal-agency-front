import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AccommodationForm from "./AccommodationForm";
import RoomType from "./AccommodationRoomType";
import AccommodationFeatures from "./AccommodationFeatures";
import AccommodationPhotoes from "./AccommodationPhotoes";

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
      component: <AccommodationFeatures accommodationId={accommodationId} />,
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
    <Tabs className="w-full">
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
      <div className="py-10">
        {items.map((item) => (
          <TabsContent key={item.title} value={item.title}>
            {item.component}
          </TabsContent>
        ))}
      </div>
    </Tabs>
  );
};

export default AccommodationTabs;
