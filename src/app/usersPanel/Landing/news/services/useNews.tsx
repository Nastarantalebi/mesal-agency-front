import useGetData from "@/services/useGetData";
import type { TNewsResponse } from "../types/types";
import { userNews_key, userNews_url } from "@/data/querykeys";
import type { TPaginatedResponse } from "@/types";
import useGetById from "@/services/useGetById";

interface Props {
  newsId?: string | number | null;
}

const useNews = ({ newsId }: Props) => {
  const getNews = useGetData<TPaginatedResponse<TNewsResponse>>({
    key: [userNews_key],
    url: userNews_url,
  });

  const getNewsById = useGetById<TNewsResponse>({
    key: [userNews_key, String(newsId)],
    url: userNews_url,
    id: newsId,
    enabled: !!newsId,
  });
  return { getNews, getNewsById };
};

export default useNews;
