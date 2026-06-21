import { useState } from "react";
import CustomDialog from "@/components/modal/CustomDialog";
import NewsForm from "./NewsForm";
import { useNews } from "../../services/useSetting";
import CardList from "@/components/card/CardList";

const NewsList = () => {
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number>();

  const { getNews, deletNews } = useNews({});
  const onEdit = (id: number) => {
    setOpen(true);
    setSelectedId(id);
  };
  const onAdd = () => {
    setOpen(true);
  };
  const OnDelete = (id: number) => {
    deletNews.mutateAsync({ id: id });
  };

  return (
    <>
      <CardList
        onAdd={onAdd}
        OnEdit={onEdit}
        data={getNews.data}
        onDelete={OnDelete}
      />
      <CustomDialog
        dialogContent={<NewsForm newsId={selectedId} setOpen={setOpen} />}
        dialogTitle={selectedId ? "ویرایش خبر" : "افزودن خبر"}
        onOpenChange={() => setOpen(false)}
        open={open}
        size="xxl"
      />
    </>
  );
};

export default NewsList;
