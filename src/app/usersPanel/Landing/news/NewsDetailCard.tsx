import type { TNewsResponse } from "./types/types";
import { miladiToShamsi } from "@/components/form/DateConverter";

interface Props {
  news: TNewsResponse;
}

const NewsDetailCard = ({ news }: Props) => {
  return (
    <div className="flex flex-col md:flex-row gap-6 bg-white rounded-2xl shadow-md p-5 mx-20">
      {/* image */}
      <div className="w-full md:w-64 shrink-0">
        <img
          src={news.image ? news.image : "/khabarDefault.jpg"}
          alt={news.title}
          className="w-full h-48 rounded-xl object-cover"
        />
      </div>

      {/* content */}
      <div className="flex flex-col flex-1 gap-4">
        <div className="flex flex-row gap-2">
          {" "}
          <h1 className="text-xl font-bold text-gray-800">{news.title}</h1>
          <h1 className="text-xl text-gray-700">({news.short_description})</h1>
        </div>

        <div className="flex gap-3 flex-wrap">
          <span className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
            نوع خبر: {news.type.label}
          </span>

          <span className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded-full">
            اولویت: {news.priority.label}
          </span>
        </div>

        <p className="text-gray-600 leading-relaxed">{news.description}</p>

        <div className="flex gap-6 pt-2 text-sm text-gray-500">
          <span>تاریخ انتشار: {miladiToShamsi(news.published_date)}</span>
          <span>اسلاگ: {news.slug}</span>
        </div>
      </div>
    </div>
  );
};

export default NewsDetailCard;
