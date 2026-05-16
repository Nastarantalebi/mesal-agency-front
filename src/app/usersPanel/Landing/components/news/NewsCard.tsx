import { miladiToShamsi } from "@/components/form/DateConverter";
import type { TNewsResponse } from "./types/types";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft } from "lucide-react";

const NewsCard = ({ news }: { news: TNewsResponse }) => {
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

        <Badge className="w-fit bg-red-200 text-red-400 border border-red-400 text-xs px-3 py-1 rounded-full">
          {news.priority.label}
        </Badge>

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

          <div className="flex items-center gap-1 text-sm text-primary font-medium cursor-pointer group-hover:gap-2 transition-all">
            <span>بیشتر</span>
            <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          </div>

        </div>
      </div>

    </div>
  );
};

export default NewsCard;
