import UserHeader from "@/app/usersPanel/components/header/UserHeader";
import NewsDetailCard from "@/app/usersPanel/Landing/news/NewsDetailCard";
import useNews from "@/app/usersPanel/Landing/news/services/useNews";
import CustomCard from "@/components/card/CustomCard";
import CustomLoader from "@/components/loading/CustomLoader";
import { Toaster } from "@/components/ui/sonner";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/news/")({
  validateSearch: (search) => ({
    id: search.id ? Number(search.id) : undefined,
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useSearch();
  const { getNews, getNewsById } = useNews({ newsId: id });

  return (
    <div className="font-display!">
      <Toaster richColors position="top-right" />
      <UserHeader />
      {id && getNewsById.data ? (
        <div className="bg-primary/10 py-6">
          {" "}
          <NewsDetailCard news={getNewsById.data} />
        </div>
      ) : (
        <></>
      )}
      <h2 className="mx-20 mt-10 border-r-4 border-primary pr-4 text-xl font-extrabold text-gray-800">
        اخبار دیگر
      </h2>
      <div className="mx-20 my-5 flex justify-center items-center gap-2">
        {getNews.isFetching ? (
          <CustomLoader />
        ) : (
          <CustomCard data={getNews.data} />
        )}
      </div>
      <Outlet />
    </div>
  );
}
