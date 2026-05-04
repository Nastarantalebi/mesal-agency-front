import { type ReactNode } from "react";
import { data } from "../../fixtures";
interface Props {
  data: {
    subject: string;
    title: string;
    details: string;
    data: { name: string; icon: ReactNode; className?: string }[];
  };
}

const Services = () => {
  return (
    <div className="flex flex-row mx-10 gap-5 my-10 w-fit">
      {data.services.data.map((service) => (
        <div className="w-30 h-30 flex flex-col gap-2 justify-center items-center rounded-2xl bg-creamy-400/50 text-gray-700 ">
          {service.icon}
          {service.name}
        </div>
      ))}
    </div>
  );
};

export default Services;
