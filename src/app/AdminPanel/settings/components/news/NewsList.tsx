import { useState } from "react";
import NewsCard from "./NewsCard";
import { Card } from "@/components/ui/card";
import ListPagination from "@/components/list/ListPagination";
import CustomDialog from "@/components/modal/CustomDialog";
import NewsForm from "./NewsForm";
import { useNews } from "../../services/useSetting";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const NewsList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number>();

  const { getNews, deletNews } = useNews({ currentPage });
  const pageCount = getNews.data?.count
    ? Math.ceil(getNews.data.count / 10)
    : 0;

  return (
    <>
      <div className="flex justify-end">
        <Button
          onClick={() => setOpen(true)}
          variant="outline"
          className="mb-3 border-green-600 text-green-600 hover:bg-green-50 hover:text-green-600 w-full sm:w-auto"
        >
          <Plus />
          افزودن خبر جدید
        </Button>
      </div>

      <Card className="bg-primary-10 px-5">
        <div>
          {getNews.data ? (
            <NewsCard
              news={getNews.data}
              onEdit={(id: number) => {
                setOpen(true);
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
          dialogContent={<NewsForm newsId={selectedId} setOpen={setOpen}/>}
          dialogTitle={selectedId ? "ویرایش خبر" : "افزودن خبر"}
          onOpenChange={() => setOpen(false)}
          open={open}
          size="xxl"
        />
      </Card>
    </>
  );
};

export default NewsList;
