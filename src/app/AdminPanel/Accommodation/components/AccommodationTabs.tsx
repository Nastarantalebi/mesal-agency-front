import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AccommodationForm from "../../AccommodationAdd/AccommodationForm";
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
  accommodationId: number;
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
    <div className="flex flex-row items-start justify-center gap-4 px-8">
      <Tabs defaultValue={items[0].title} className="w-full">
        <div className="flex items-center justify-center gap-5">
          <CustomButton className="bg-primary hover:bg-primary/80 shrink-0 text-white">
            {`اقامتگاه ${data?.name}`}
          </CustomButton>
          <TabsList className="w-full py-7 px-5">
            {items.map((item) => (
              <TabsTrigger
                key={item.title}
                value={item.title}
                className="data-[state=active]:bg-primary/30 data-[state=active]:border data-[state=active]:border-primary data-[state=active]:text-secondary py-5 text-secondary"
              >
                {item.title}
              </TabsTrigger>
            ))}
          </TabsList>
          <CustomButton
            className="bg-primary hover:bg-primary/80 shrink-0 text-white"
            onClick={() => navigate({ to: "/dashboard" })}
          >
            <MoveLeft />
          </CustomButton>
        </div>

        <div className="py-10">
          {items.map((item) => (
            <TabsContent key={item.title} value={item.title}>
              {item.component}
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
};

export default AccommodationTabs;
