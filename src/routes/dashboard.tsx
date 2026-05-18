import AccommodationList from "@/app/AdminPanel/Accommodation/components/AccommodationList";
import Header from "@/app/AdminPanel/AdminFeatures/AdminHeader";
import AccommodationSettings from "@/app/AdminPanel/settings/components/setting/AccommodationSettings";
import TourSteps from "@/app/AdminPanel/tours/components/TourSteps";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  const tabsItems = [
    {
      title: "لیست اقامتگاه‌ها",
      component: <AccommodationList />,
    },
    {
      title: "لیست تورها",
      component: <TourSteps />,
    },
    {
      title: "تنظیمات",
      component: <AccommodationSettings />,
    },
  ];

  return (
    <div className="">
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="flex flex-row items-start justify-center gap-4 px-8">
          <Tabs defaultValue={tabsItems[0].title} className="w-full">
            <div className="flex items-center justify-center gap-5">
              <TabsList className="w-full py-7 px-5">
                {tabsItems.map((item) => (
                  <TabsTrigger
                    key={item.title}
                    value={item.title}
                    className="data-[state=active]:bg-primary/30 data-[state=active]:border data-[state=active]:border-primary data-[state=active]:text-secondary py-5 text-secondary"
                  >
                    {item.title}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            <div className="py-5">
              {tabsItems.map((item) => (
                <TabsContent key={item.title} value={item.title}>
                  {item.component}
                </TabsContent>
              ))}
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
