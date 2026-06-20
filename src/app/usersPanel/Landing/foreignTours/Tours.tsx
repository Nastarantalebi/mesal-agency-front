import CustomButton from "@/components/form/CustomButton";

const Tours = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-5 mx-5 md:mx-30 my-10">
      {/* Card 1 - تورهای داخلی */}
      <div className="relative flex flex-col md:flex-row items-end md:items-end justify-between rounded-2xl overflow-hidden min-h-52 bg-linear-to-br from-creamy-100 via-primary-10 to-primary-20">
        {/* Text - راست */}
        <div className="flex flex-col justify-center text-right p-5 md:p-6 gap-2 z-10 w-full md:w-1/2">
          <h2 className="text-xl font-black leading-tight text-secondary">
            رزرو بهترین <span className="text-primary">تورهای داخلی</span>
          </h2>
          <p className="text-sm text-primary-90 leading-7">
            تجربه‌ای از اقامت در بهترین هتل‌ها در سراسر کشور از هتل‌های لوکس
            شهری تا ریزورت‌های ساحلی.
          </p>
          <div className="flex">
            <CustomButton className="rounded-xl bg-white/70 px-6 py-3 text-primary-100 font-semibold border border-primary-30 hover:bg-white transition">
              مشاهده جزئیات
            </CustomButton>
          </div>
        </div>

        {/* Image - چپ */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end items-end overflow-hidden">
          <img
            src="./hotel.png"
            alt="iran hotel"
            className="h-44 md:h-60 object-contain drop-shadow-md"
          />
        </div>
      </div>

      {/* Card 2 - تورهای خارجی */}
      <div className="relative flex flex-col md:flex-row-reverse items-end justify-between rounded-2xl overflow-hidden min-h-52 bg-linear-to-br from-creamy-100 via-primary-10 to-primary-20">
        {/* Text - چپ */}
        <div className="flex flex-col justify-center text-right p-5 md:p-6 gap-2 z-10 w-full md:w-1/2">
          <h2 className="text-xl font-black leading-tight text-secondary">
            رزرو بهترین <span className="text-primary">تورهای خارجی</span>
          </h2>
          <p className="text-sm text-primary-90 leading-7">
            تجربه‌ای متفاوت از اقامت در بهترین هتل‌های خارجی؛ از هتل‌های لوکس
            شهری تا ریزورت‌های ساحلی.
          </p>
          <div className="flex">
            <CustomButton className="rounded-xl bg-white/70 px-6 py-3 text-primary-100 font-semibold border border-primary-30 hover:bg-white transition">
              مشاهده جزئیات
            </CustomButton>
          </div>
        </div>

        {/* Image - راست */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-start items-end overflow-hidden">
          <img
            src="./foreignHotel.webp"
            alt="foreign hotel"
            className="h-44 md:h-60 object-contain drop-shadow-md"
          />
        </div>
      </div>
    </section>
  );
};

export default Tours;
