import React from 'react';
import type { TNews } from '../../fixtures/validation';

interface NewsCardProps {
  news: TNews;
  author?: string;
  readTime?: number;
  imageUrl?: string; // For displaying the image (since File needs to be converted to URL)
}

const NewsCard: React.FC<NewsCardProps> = ({ 
  news,
  author = "نویسنده",
  readTime = 5,
  imageUrl
}) => {
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fa-IR');
  };

  // Get category label
  const getCategoryLabel = () => {
    if (news.type === "announcement") return "اطلاعیه";
    return "خبر";
  };

  // Get priority badge color
  const getPriorityColor = () => {
    switch (news.priority) {
      case "urgent": return "bg-red-600/90";
      case "high": return "bg-orange-600/90";
      default: return "bg-black/75";
    }
  };

  return (
    <div></div>
    // <article className="group max-w-sm bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
    //   <div className="relative h-60 overflow-hidden">
    //     <img 
    //       src={imageUrl || '/placeholder-news.jpg'} 
    //       alt={news.title}
    //       className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-105"
    //     />
    //     <span className={`absolute top-4 left-4 ${getPriorityColor()} backdrop-blur-sm text-white px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide`}>
    //       {getCategoryLabel()}
    //     </span>
        
    //     {news.status === "draft" && (
    //       <span className="absolute top-4 right-4 bg-gray-600/90 backdrop-blur-sm text-white px-3.5 py-1.5 rounded-full text-xs font-semibold">
    //         پیش‌نویس
    //       </span>
    //     )}
    //   </div>
      
    //   <div className="p-6">
    //     <h3 className="text-xl font-bold leading-snug mb-3 text-gray-900 line-clamp-2">
    //       {news.title}
    //     </h3>
    //     <p className="text-[15px] leading-relaxed text-gray-600 mb-5 line-clamp-3">
    //       {news.short_description}
    //     </p>
        
    //     <div className="flex items-center text-[13px] text-gray-400">
    //       <span className="font-semibold text-gray-700">{author}</span>
    //       <span className="mx-2">•</span>
    //       <span>{formatDate(news.published_date)}</span>
    //       <span className="mx-2">•</span>
    //       <span>{readTime} دقیقه مطالعه</span>
    //     </div>
    //   </div>
    // </article>
  );
};

export default NewsCard;
