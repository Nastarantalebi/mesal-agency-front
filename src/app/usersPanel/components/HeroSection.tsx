import { useEffect, useState } from "react";
import SearchForm from "./SearchForm";

const HeroSection = () => {
  const [animate, setAnimate] = useState(false);

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
