import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { settingTabs } from "../../fixtures/settingTabsData";

const AccommodationSettings = () => {
  return (
    <div className="py-8">
      <Tabs
        defaultValue={settingTabs[0].title}
        orientation="vertical"
        className="flex flex-row items-start gap-6"
      >
        <TabsList className="flex flex-col h-auto w-48 shrink-0 sticky top-4 py-3 px-3 gap-1 ">
          {settingTabs.map((item) => (
            <TabsTrigger
              key={item.title}
              value={item.title}
              className=" w-full data-[state=active]:bg-primary/30 data-[state=active]:border data-[state=active]:border-primary data-[state=active]:text-secondary text-secondary"
            >
              {item.title}
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="w-full">
          {settingTabs.map((item) => (
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
