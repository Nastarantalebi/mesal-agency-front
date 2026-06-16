import AccommodationCardsDetails from "@/app/usersPanel/components/accommodation/AccommodationCardsDetails";
import Filter from "@/app/usersPanel/components/filter/components/Filter";
import SearchBox from "@/app/usersPanel/components/filter/components/SearchBox";
import UserHeader from "@/app/usersPanel/components/header/UserHeader";
import { useAccommodation } from "@/app/usersPanel/services/useAccommoation";
import CustomLoader from "@/components/loading/CustomLoader";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Toaster } from "sonner";
import z from "zod";

export const Route = createFileRoute("/search")({
  component: RouteComponent,
  validateSearch: (search) =>
    z
      .object({
        name__contains: z.string().optional(),

        city__province__id: z.coerce.number().optional(),
        city__id: z.coerce.number().optional(),

        type__id: z
          .union([
            z.string(),
            z.array(z.string()),
            z.number(),
            z.array(z.number()),
          ])
          .optional()
          .transform((v) => {
            if (!v) return undefined;
            if (typeof v === "number") return [v];
            if (Array.isArray(v)) {
              return v.map((item) =>
                typeof item === "number" ? item : Number(item),
              );
            }
            return v.split(",").map(Number);
          }),

        feature__id: z
          .union([
            z.string(),
            z.array(z.string()),
            z.number(),
            z.array(z.number()),
          ])
          .optional()
          .transform((v) => {
            if (!v) return undefined;
            if (typeof v === "number") return [v];
            if (Array.isArray(v)) {
              return v.map((item) =>
                typeof item === "number" ? item : Number(item),
              );
            }
            return v.split(",").map(Number);
          }),

        stars__gte: z.coerce.number().optional(),
        stars__lte: z.coerce.number().optional(),

        open_start__gte: z.string().optional().nullable(),
        open_end__lte: z.string().optional().nullable(),
      })
      .parse(search),
});

function RouteComponent() {
  const { getAccommodations } = useAccommodation();

  return (
    <div className="font-display!">
      <Toaster richColors position="top-right" />
      <UserHeader />
      <SearchBox />
      {/* <FilterBadges /> */}
      <div className="grid grid-cols-6">
        <div className="">
          <Filter />
        </div>
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
