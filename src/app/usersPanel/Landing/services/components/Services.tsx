import { data } from "../../fixtures";

const Services = () => {
  return (
    <div className=" justify-center flex flex-row mx-4 md:mx-10 hide-scrollbar gap-3 md:gap-5 w-full overflow-x-auto">
      {data.services.data.map((service, index) => (
        <div
          key={index}
          className="min-w-20 md:min-w-30 h-20 md:h-30 flex flex-col gap-1 md:gap-2 justify-center items-center rounded-xl md:rounded-2xl bg-creamy-400/50 text-gray-700 text-xs md:text-sm text-center p-2"
        >
          <div className="w-6 h-6 md:w-8 md:h-8">{service.icon}</div>
          <span className="line-clamp-2">{service.name}</span>
        </div>
      ))}
    </div>
  );
};

export default Services;
