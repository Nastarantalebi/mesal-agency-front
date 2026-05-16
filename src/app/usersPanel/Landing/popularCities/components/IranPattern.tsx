import CustomButton from "@/components/form/CustomButton";
import PopularCities from "./PopularCities";
import { ChevronLeft } from "lucide-react";
import usePopularCities from "../fixtures/usePopularCities";
import { Link } from "@tanstack/react-router";

const IranPattern = () => {
  const { popularCities } = usePopularCities();
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 2xl:grid-cols-2 justify-items-center items-center mx-4 md:mx-10 lg:mx-20 md:gap-0 ">
      <div className="col-span-1 flex flex-col gap-6 md:gap-10">
        <h1 className="font-bold text-3xl md:text-5xl lg:text-6xl bg-linear-to-r from-primary to-gray-300 bg-clip-text text-transparent">
          مقاصد پرطرفدار
        </h1>
        <p className="text-base md:text-xl lg:text-2xl leading-7 md:leading-9 lg:leading-10 text-gray-500 max-w-3xl">
          منتخبی از بهترین اقامتگاه‌ها در پربازدیدترین شهرهای سیاحتی و زیارتی
          ایران؛ سفرتان را از همین‌جا شروع کنید.
        </p>
        <CustomButton
          className="bg-accent w-fit text-white py-4 md:py-6 px-4 md:px-6 text-base md:text-lg rounded-xl md:rounded-2xl"
          icon={<ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />}
        >
          شروع کنید
        </CustomButton>
      </div>

      <div
        className="w-90 h-96 sm:h-130 sm:w-130 md:w-full md:h-165 2xl:w-200 2xl:h-192.5 xl:w-180 xl:h-180 lg:h-175 lg:w-180 relative col-span-2 2xl:col-span-1 bg-center bg-contain md:bg-auto"
        style={{
          backgroundImage: "url('/iran.png')",
          backgroundRepeat: "no-repeat",
        }}
      >
        {popularCities.map((city) => (
          <Link
            key={city.name}
            to="/search"
            className={`absolute cursor-pointer ${city.position}`}
            search={{
              city__province__id: city.provinceId,
              city__id: city.cityId,
              type__id: [],
              feature__id: [],
            }}
          >
            <PopularCities city={city} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default IranPattern;
