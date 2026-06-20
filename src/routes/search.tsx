import AccommodationCardsDetails from "@/app/usersPanel/components/accommodation/AccommodationCardsDetails";
import Filter from "@/app/usersPanel/components/filter/components/Filter";
import SearchBox from "@/app/usersPanel/components/filter/components/SearchBox";
import UserHeader from "@/app/usersPanel/components/header/UserHeader";
import { useAccommodation } from "@/app/usersPanel/services/useAccommoation";
import CustomLoader from "@/components/loading/CustomLoader";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Toaster } from "sonner";

type SearchParams = {
  name__contains?: string;
  city__province__id?: number;
  city__id?: number;
  type__id?: number[];
  feature__id?: number[];
  stars__gte?: number;
  stars__lte?: number;
  open_start__gte?: string | null;
  open_end__lte?: string | null;
};

export const Route = createFileRoute("/search")({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>): SearchParams => {
    return {
      name__contains: search.name__contains as string | undefined,
      city__province__id: search.city__province__id
        ? Number(search.city__province__id)
        : undefined,
      city__id: search.city__id ? Number(search.city__id) : undefined,
      type__id: search.type__id
        ? String(search.type__id).split(",").map(Number)
        : undefined,
      feature__id: search.feature__id
        ? String(search.feature__id).split(",").map(Number)
        : undefined,
      stars__gte: search.stars__gte ? Number(search.stars__gte) : undefined,
      stars__lte: search.stars__lte ? Number(search.stars__lte) : undefined,
      open_start__gte: (search.open_start__gte as string) ?? undefined,
      open_end__lte: (search.open_end__lte as string) ?? undefined,
    };
  },
});
function RouteComponent() {
  const { getAccommodations } = useAccommodation();

  return (
    <div className="font-display! animate-slide-down">
      <Toaster richColors position="top-right" />
      <UserHeader />
      <SearchBox />
      {/* <FilterBadges /> */}
      <div className="grid grid-cols-6">
        {/* <div className=""> */}
        <Filter />
        {/* </div> */}
        <div className=" col-span-5 ml-5 flex justify-center items-center">
          {getAccommodations.isFetching ? (
            <CustomLoader />
          ) : (
            <AccommodationCardsDetails
              accommodations={getAccommodations.data?.results}
            />
          )}
        </div>
      </div>

      <Outlet />
    </div>
  );
}
