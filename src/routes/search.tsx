import AccommodationCardsDetails from "@/app/usersPanel/components/AccommodationCardsDetails";
import useAccommoation from "@/app/usersPanel/services/useAccommoation";
import { createFileRoute, useSearch } from "@tanstack/react-router";
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
      })
      .parse(search),
});

function RouteComponent() {
  const search = useSearch({ from: "/search" });
  const provinceId = search.city__province__id as string | undefined;
  console.log(provinceId)
  
  const { getAccommodations } = useAccommoation({
    city__province__id: Number(provinceId),
  });
  console.log(getAccommodations.data)
  // console.log(getAccommodations.data)
  return (
    <div className="flex justify-center">
      <AccommodationCardsDetails
        accommodations={getAccommodations?.data?.results}
      />
    </div>
  );
}
