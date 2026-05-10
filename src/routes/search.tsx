import AccommodationCardsDetails from "@/app/usersPanel/components/AccommodationCardsDetails";
import FilterBadges from "@/app/usersPanel/components/filter/FilterBadges";
import { filterValidation } from "@/app/usersPanel/components/filter/fixtures/Validation";
import type { filterdata } from "@/app/usersPanel/components/filter/types/types";
import UserHeader from "@/app/usersPanel/components/UserHeader";
import { useAccommoation } from "@/app/usersPanel/services/useAccommoation";
import CustomLoader from "@/components/loading/CustomLoader";
import { createFileRoute, Outlet, useSearch } from "@tanstack/react-router";
import { useState } from "react";
import { Toaster } from "sonner";
import z from "zod";

export const Route = createFileRoute("/search")({
  component: RouteComponent,
  validateSearch: (search) =>     z
      .object({
        name__contains: z.string().optional(),
        city__province__id: z.number().optional(),
        city__id: z.number().optional(),
        type__id: z.number().optional(),
        stars__gte: z.number().optional(),
        stars__lte: z.number().optional(),
        feature__id: z.number().optional(),
          open_start__gte: z.string().optional().nullable(),
          open_end__lte: z.string().optional().nullable(),
        // num_adults: z.number().optional(),
        // num_children: z.number().optional(),
      }).parse(search),
});

function RouteComponent() {
  const search = useSearch({ from: "/search" });
  const provinceId = search.city__province__id as string | undefined;
  console.log(provinceId);

  const [filters, setFilters] = useState<filterdata>();

  console.log("filters", filters)

  const { getAccommodations } = useAccommoation(filters);

  // console.log("accommodations:", getAccommodations.data);
  return (
    <div className="font-display!">
      <Toaster richColors position="top-right" />
      <UserHeader />
      <FilterBadges setFilter={setFilters} filter={filters} />
      <div className="mx-20 my-5 flex justify-center items-center">
        {getAccommodations.isFetching ? (
          <CustomLoader />
        ) : (
          <AccommodationCardsDetails
            accommodations={getAccommodations.data?.results}
          />
        )}
      </div>
      <Outlet />
    </div>
  );
}
