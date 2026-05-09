import AccommodationCardsDetails from "@/app/usersPanel/components/AccommodationCardsDetails";
import FilterBadges from "@/app/usersPanel/components/filter/FilterBadges";
import UserHeader from "@/app/usersPanel/components/UserHeader";
import { useAccommoation } from "@/app/usersPanel/services/useAccommoation";
import { createFileRoute, Outlet, useSearch } from "@tanstack/react-router";
import { Toaster } from "sonner";
import z from "zod";

export const Route = createFileRoute("/search")({
  component: RouteComponent,
  validateSearch: (search) =>
    z
      .object({
        name__contains: z.string().optional(),
        city__province__id: z.number().optional(),
        city__id: z.number().optional(),
        type__id: z.number().optional(),
        stars__gte: z.number().optional(),
        stars__lte: z.number().optional(),
        feature__id: z.number().optional(),
        // num_adults: z.number().optional(),
        // num_children: z.number().optional(),
        // start: z.date().optional(),
        // end: z.date().optional(),
      })
      .parse(search),
});

function RouteComponent() {
  const search = useSearch({ from: "/search" });
  const provinceId = search.city__province__id as string | undefined;
  console.log(provinceId);

  const { getAccommodations } = useAccommoation();
  console.log(getAccommodations.data)
  return (
    <div className="font-display!">
      <Toaster richColors position="top-right" />
      <UserHeader />
      <FilterBadges />
      <div className="mx-20 my-5">
        <AccommodationCardsDetails
          accommodations={getAccommodations.data?.results}
        />
      </div>

      <Outlet />
    </div>
    // <div className="flex justify-center">
    //   <AccommodationCardsDetails
    //     accommodations={getAccommodations?.data?.results}
    //   />
    // </div>
  );
}
