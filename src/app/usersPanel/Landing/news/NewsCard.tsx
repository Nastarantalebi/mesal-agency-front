import { miladiToShamsi } from "@/components/form/DateConverter";
import type { TNewsResponse } from "./types/types";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

const NewsCard = ({ news }: { news: TNewsResponse }) => {
  const navigate = useNavigate();

  const handleClick = (id: number) => {
    navigate({
      to: "/news",
      search: { id },
    });
  };

  return (
    <div className="group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 p-4 rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md hover:border-primary/40 transition-all duration-300">
      {/* image */}
      <div className="w-full sm:w-auto shrink-0 overflow-hidden rounded-xl order-1 sm:order-2">
        <img
          src={news.image ? news.image : "./khabarDefault.jpg"}
          alt="news image"
          className="w-full sm:w-28 h-40 sm:h-28 object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* description */}
      <div className="flex flex-col flex-1 gap-3 order-2 sm:order-1">
        <div className="flex gap-3 flex-wrap">
          <span className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
            نوع خبر: {news.type.label}
          </span>

          <span className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded-full">
            اولویت: {news.priority.label}
          </span>
        </div>

        <h2 className="text-base sm:text-lg font-bold text-gray-800 group-hover:text-primary transition-colors">
          {news.title}
        </h2>

        <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
          {news.short_description}
        </p>

        <div className="flex items-center justify-between sm:justify-start gap-6 sm:gap-10 pt-1">
          <p className="text-xs text-gray-500">
            تاریخ انتشار: {miladiToShamsi(news.published_date)}
          </p>

          <div
            className="group/btn flex items-center gap-1 text-sm text-primary font-medium cursor-pointer hover:gap-2 transition-all"
            onClick={() => handleClick(news.id)}
          >
            <span>بیشتر</span>
            <ChevronLeft className="w-4 h-4 transition-transform group-hover/btn:-translate-x-1" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
