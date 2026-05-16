import { useState } from "react";
import { useNews } from "../../services/useSetting";
import NewsCard from "./NewsCard";
import { Card } from "@/components/ui/card";
import ListPagination from "@/components/list/ListPagination";
import CustomDialog from "@/components/modal";
import NewsForm from "./NewsForm";
import { nullable } from "zod";

const NewsList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [openAdd, setOpenAdd] = useState(false);
  const [selectedId, setSelectedId] = useState<number>();

  const { getNews, deletNews } = useNews({ currentPage });
  const pageCount = getNews.data?.count
    ? Math.ceil(getNews.data.count / 10)
    : 0;

  return (
    <Card className="bg-primary-10 px-5">
      <div>
        {getNews.data ? (
          <NewsCard
            news={getNews.data}
            onEdit={(id: number) => {
              setOpenAdd(true);
              setSelectedId(id);
            }}
            onDelete={(id: number) => deletNews.mutateAsync({ id: id })}
          />
        ) : (
          <span>خبری وجود ندارد.</span>
        )}
      </div>
      <ListPagination
        currentPage={currentPage}
        pageCount={pageCount}
        onPageChange={setCurrentPage}
      />
      <CustomDialog
        dialogContent={selectedId ? <NewsForm newsId={selectedId} /> : <></>}
        dialogTitle="ویرایش خبر"
        onOpenChange={() => setOpenAdd(false)}
        open={openAdd}
        size="xxl"
      />
    </Card>
  );
};

export default NewsList;
