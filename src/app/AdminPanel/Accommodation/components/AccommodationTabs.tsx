import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AccommodationForm from "./AccommodationForm";
import RoomType from "./AccommodationRoomType";
import AccommodationFeatures from "./AccommodationFeatures";
import AccommodationPhotoes from "./AccommodationPhotoes";
import useGetData from "@/services/useGetData";
import type { TAccommodationResponse } from "../types";
import { accommodation_key, accommodation_url } from "@/data/querykeys";
import CustomButton from "@/components/form/CustomButton";
import { MoveLeft } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

const AccommodationTabs = ({
  accommodationId,
}: {
  accommodationId: string;
}) => {
  const { data } = useGetData<TAccommodationResponse>({
    key: [accommodation_key, String(accommodationId)],
    url: `${accommodation_url}${accommodationId}/`,
    enabled: !!accommodationId,
  });
  const navigate = useNavigate();

  const items = [
    {
      title: "اطلاعات اولیه",
      component: (
        <AccommodationForm
          buttonText="ویرایش"
          accommodationId={accommodationId}
        />
      ),
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
    <div className="flex flex-row items-start gap-4 px-10">
      <CustomButton className="bg-primary hover:bg-primary/80 shrink-0 text-white">
        {`اقامتگاه ${data?.name}`}
      </CustomButton>
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
        <div className="py-10">
          {items.map((item) => (
            <TabsContent key={item.title} value={item.title}>
              {item.component}
            </TabsContent>
          ))}
        </div>
      </Tabs>
      <CustomButton
        className="bg-primary-50/70 hover:bg-primary/80 shrink-0 "
        onClick={() => navigate({ to: "/dashboard/accommodation-list" })}
      >
        <MoveLeft />
      </CustomButton>
    </div>
  );
};

export default AccommodationTabs;
