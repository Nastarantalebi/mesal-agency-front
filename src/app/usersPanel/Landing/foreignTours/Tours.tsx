import CustomButton from "@/components/form/CustomButton";

const Tours = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-5 mx-45">
      <div className="rounded-2xl col-span-1 bg-linear-to-br from-creamy-100 via-primary-10 to-primary-20">
        {/* ✅ Right Side - Image */}
        <div className="relative">
          <img
            src="./hotel.png"
            alt="iran hotel"
            className="absolute -top-30 h-75"
          />
        </div>

        {/* ✅ Left Side - Text */}
        <div className=" my-5 flex flex-col justify-center  text-right mr-80">
          <h2 className="text-xl md:text-xl font-black leading-tight text-secondary">
            رزرو بهترین <span className="text-primary">هتل‌های داخلی</span>
          </h2>

          <p className="mb-2 text-primary-90 leading-8 text-wrap">
            تجربه‌ای از اقامت در بهترین هتل‌ها در سراسر کشور از هتل‌های لوکس
            شهری تا ریزورت‌های ساحلی.
          </p>

          <div className="flex">
            <CustomButton className="rounded-xl bg-white/70 px-6 py-3 text-primary-100 font-semibold border border-primary-30 hover:bg-white transition">
              مشاهده جزئیات
            </CustomButton>
          </div>
        </div>
      </div>
      <div className="rounded-2xl col-span-1 bg-linear-to-br from-creamy-100 via-primary-10 to-primary-20">
        {/* ✅ Left Side - Text */}
        <div className="flex flex-col justify-center text-right ml-50 mr-5 my-5 ">
          <h2 className="text-xl md:text-xl font-black leading-tight text-secondary">
            رزرو بهترین <span className="text-primary">هتل‌های خارجی</span>
          </h2>

          <p className=" mb-1 text-primary-90 leading-8 text-wrap">
            تجربه‌ای متفاوت از اقامت در بهترین هتل‌های خارجی؛ از هتل‌های لوکس
            شهری تا ریزورت‌های ساحلی.
          </p>

          <div className="flex">
            <CustomButton className="rounded-xl bg-white/70 px-6 py-3 text-primary-100 font-semibold border border-primary-30 hover:bg-white transition">
              مشاهده جزئیات
            </CustomButton>
          </div>
        </div>
        {/* ✅ Right Side - Image */}
        <div className="relative ">
          <img
            src="./foreignHotel.webp"
            alt="foreign hotel"
            className="absolute -top-80 -left-25 h-80"
          />
        </div>
      </div>
    </section>
  );
};

export default Tours;
