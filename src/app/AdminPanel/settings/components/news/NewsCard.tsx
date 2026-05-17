import type { TPaginatedResponse } from "@/types";
import { Badge } from "@/components/ui/badge";
import ListEdit from "@/components/list/ListEdit";
import ListDelete from "@/app/AdminPanel/RoomTypes/components/roomTypeListIcons/ListDelete";
import type { TResponseNews } from "../../types";

interface Props {
  news: TPaginatedResponse<TResponseNews>;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const NewsCard = ({ news, onEdit, onDelete }: Props) => {
  console.log("news:", news);
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8 max-w-8xl content-center gap-4">
      {news?.results.map((item) => (
        <div
          key={item.id}
          className="relative flex flex-col rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-shadow"
        >
          {item.image ? (
            <img
              src={item.image}
              alt=""
              className="w-full h-32 rounded-t-lg object-cover"
            />
          ) : (
            <img
              src="./khabarDefault.jpg"
              alt="defaultImage"
              className="w-full h-32 rounded-t-lg object-cover"
            />
          )}
          <div className="absolute top-2 left-2 flex flex-row gap-1">
            {" "}
            <Badge className="bg-red-100 text-red-400 border border-red-400  text-[10px] rounded-full w-fit">
              {item.type.label}
            </Badge>
            <Badge className="bg-indigo-200 text-indigo-900 border border-indigo-400/50 text-[10px] rounded-full w-fit">
              {item.status.label}
            </Badge>
          </div>

          <div className="flex flex-col p-2 gap-1">
            <h2 className="text-xs font-semibold line-clamp-2 leading-tight">
              {item.title}
            </h2>
            <h3 className="text-[10px] text-gray-400 line-clamp-2 leading-snug">
              {item.short_description}
            </h3>
            <div className="flex gap-1">
              {" "}
              <ListEdit onClick={() => onEdit(item.id)} />
              <ListDelete onClick={() => onDelete(item.id)} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsCard;
