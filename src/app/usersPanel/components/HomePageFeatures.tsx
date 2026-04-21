import { useEffect, useState } from "react";
import { Trees } from "lucide-react";
import useHomePageFeatues from "../services/useHomePageFeatues";

const HomePageFeatures = () => {
  const { getHomePageFeatures } = useHomePageFeatues();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (getHomePageFeatures.data?.length) {
      // اول render می‌شود با حالت مخفی
      // بعد animate فعال می‌شود
      const t = setTimeout(() => setAnimate(true), 50);
      return () => clearTimeout(t);
    }
  }, [getHomePageFeatures.data]);

  return (
    <div className="flex flex-row justify-center items-center mt-7 gap-10 bg-gray-100/80 py-5">
      {getHomePageFeatures.data?.map((feature, index) => (
        <div
          key={feature.id}
          className={`transform transition-all duration-700 ease-out cursor-pointer
            ${animate ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-40"}
          `}
          style={{ transitionDelay: `${index * 150}ms` }}
        >
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
