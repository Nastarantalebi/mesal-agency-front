import { useEffect, useState } from "react";
import SearchForm from "../Landing/search/SearchForm";
import CustomButton from "@/components/form/CustomButton";
import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

const HeroSection = () => {
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // یک تیک تأخیر برای اینکه CSS transition درست کار کند
    const t = setTimeout(() => setAnimate(true), 50);
    return () => clearTimeout(t);
  }, []);
  return (
    <section
      className={`
        transform transition-all duration-700 ease-out w-full min-h-[70vh] bg-cover bg-center flex items-center justify-center
        ${animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
      `}
      style={{
        backgroundImage: "url('./accommodationHero.png')",
      }}
    >
      <div className="absolute top-5 right-5 flex items-center gap-2">
        <CustomButton
          onClick={() => navigate({ to: "/login" })}
          className="bg-white text-black font-semibold shadow-md hover:bg-gray-100"
        >
          <div className="flex flex-row items-center gap-2">
            <ArrowUpRight className="w-4 h-4" />
            <span>پنل ادمین</span>
          </div>
        </CustomButton>
      </div>

      <div className="flex flex-col justify-center items-center gap-5">
        <h1 className="text-white text-4xl font-bold">مقصدتان کجاست؟</h1>
        <h3 className="text-white text-xl font-bold">
          رزرو اقامتگاه در سراسر ایران
        </h3>
        <SearchForm />
      </div>
    </section>
  );
};

export default HeroSection;
