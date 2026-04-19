import { Trees } from "lucide-react";
import useHomePageFeatues from "../services/useHomePageFeatues";

const HomePageFeatures = () => {
  const { getHomePageFeatures } = useHomePageFeatues();
  console.log(getHomePageFeatures.data);
  return (
    <div className="flex flex-row justify-center items-center mt-10 gap-10">
      {getHomePageFeatures.data?.map((feature) => (
        <div key={feature.id} className="">
          <div className="bg-creamy-100 p-3 border-3 border-creamy-400 rounded-3xl flex flex-col justify-center items-center">
            <Trees size={48} strokeWidth={1} className="mb-3" />
            {feature.title}
          </div>
        </div>
      ))}
    </div>
  );
};
export default HomePageFeatures;
