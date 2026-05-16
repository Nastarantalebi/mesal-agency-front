import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NewsCard from "./NewsCard";
import useNews from "./services/useNews";

const News = () => {
  const { getNews } = useNews({});
  const news = getNews.data?.results ?? [];

  // خبرها را دو‌تا‌دو‌تا گروه‌بندی می‌کنیم
  const groupedNews = useMemo(() => {
    const chunks = [];
    for (let i = 0; i < news.length; i += 2) {
      chunks.push(news.slice(i, i + 2));
    }
    return chunks;
  }, [news]);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    if (groupedNews.length <= 1) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % groupedNews.length);
    }, 7000); // هر 7 ثانیه

    return () => clearInterval(interval);
  }, [groupedNews.length]);

  const variants = {
    enter: {
      x: -200,
      opacity: 0,
    },
    center: {
      x: 0,
      opacity: 1,
    },
    exit: {
      x: 200,
      opacity: 0,
    },
  };

  return (
    <div className="w-full overflow-hidden px-10">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {groupedNews[currentSlide]?.map((item) => (
            <NewsCard key={item.id} news={item} />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default News;
