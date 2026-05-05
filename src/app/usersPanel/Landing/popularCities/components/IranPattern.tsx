import CustomButton from "@/components/form/CustomButton";
import { popularCities } from "../fixtures";
import PopularCities from "./PopularCities";
import { ChevronLeft } from "lucide-react";

const IranPattern = () => {
  return (
    <div className="flex flex-row justify-center items-center mx-20">
      <div className="flex flex-col gap-10">
        <h1 className="font-bold text-6xl bg-linear-to-r from-primary to-gray-300 bg-clip-text text-transparent">
          مقاصد پرطرفدار
        </h1>
        <p className="text-2xl leading-10 text-gray-500 max-w-3xl">
          منتخبی از بهترین اقامتگاه‌ها در پربازدیدترین شهرهای سیاحتی و زیارتی
          ایران؛ سفرتان را از همین‌جا شروع کنید.
        </p>
        <CustomButton className="bg-accent w-fit text-white py-6 px-6 text-lg rounded-2xl" icon={<ChevronLeft className="w-8! h-8!"/>} >شروع کنید</CustomButton>
      </div>

      <div
        className=" md:w-215 h-192.5 relative"
        style={{
          backgroundImage: "url('/iran.png')", // تغییر از './iran.png' به '/iran.png'
          backgroundRepeat: "no-repeat",
        }}
      >
        {popularCities.map((city) => (
          <div
            key={city.name}
            className={`absolute cursor-pointer ${city.position}`}
          >
            <PopularCities city={city} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default IranPattern;
