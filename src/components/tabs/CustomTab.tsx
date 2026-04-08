import type { JSX } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

interface Props {
  tabItems: tabItems[];
}

interface tabItems {
  title: string;
  component: JSX.Element;
}

const CustomTab = ({ tabItems }: Props) => {
  return (
    <Tabs defaultValue={tabItems[0].title} className="w-full">
      <TabsList className="w-full">
        {tabItems.map((item) => (
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
        {tabItems.map((item) => (
          <TabsContent key={item.title} value={item.title}>
            {item.component}
          </TabsContent>
        ))}
      </div>
    </Tabs>
  );
};

export default CustomTab;
