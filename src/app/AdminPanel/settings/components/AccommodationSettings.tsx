import AddBedForm from "./bed/AddBedForm";
import BedsList from "./bed/BedsList";
import FeaturesList from "./features/FeaturesList";
import AddFeaturesForm from "./features/AddFeaturesForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DefaultsForm from "./defaults/AddDefaults";

const AccommodationSettings = () => {
  const tabsItems = [
    {
      title: "ویژگی های اقامتگاه",
      component: (
        <div className="flex flex-col gap-10">
          <AddFeaturesForm /> <FeaturesList />
        </div>
      ),
    },
    {
      title: "نوع تخت",
      component: (
        <div className="flex flex-col gap-10">
          <AddBedForm /> <BedsList />
        </div>
      ),
    },
    {
      title: "پیشفرض ها",
      component: (
        <div className="flex flex-col gap-10">
          <DefaultsForm/>
        </div>
      ),
    },
  ];

  return (
    <div className="py-8">
      <Tabs
        defaultValue={tabsItems[0].title}
        orientation="vertical"
        className="flex flex-row items-start gap-6"
      >
        <TabsList className="flex flex-col h-auto w-48 shrink-0 sticky top-4 py-3 px-3 gap-1 ">
          {tabsItems.map((item) => (
            <TabsTrigger
              key={item.title}
              value={item.title}
              className=" w-full data-[state=active]:bg-primary/30 data-[state=active]:border data-[state=active]:border-primary data-[state=active]:text-secondary text-secondary"
            >
              {item.title}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Tab content — takes remaining space */}
        <div className="w-full">
          {tabsItems.map((item) => (
            <TabsContent key={item.title} value={item.title}>
              {item.component}
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
};

export default AccommodationSettings;
