import { Badge } from "@/components/ui/badge";
import { beds_key, beds_url } from "@/data/querykeys";
import useGetData from "@/services/useGetData";
import type { TBedResponse } from "../types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { TPaginatedResponse } from "@/types";
import { X } from "lucide-react";
import useDeleteData from "@/services/useDeleteData";

const BedsList = () => {
  const { data: bedsData } = useGetData<TPaginatedResponse<TBedResponse>>({
    key: [beds_key],
    url: beds_url,
  });

  const { mutateAsync } = useDeleteData({
    key: [beds_key],
    url: `${beds_url}`,
  });

  return (
    <div className="flex flex-col gap-10">
      <Card className="shadow-lg shadow-primary/50">
        <CardHeader>
          <CardTitle className="text-primary">نوع اتاق های اضافه شده</CardTitle>
        </CardHeader>
        {bedsData ? (
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {bedsData.results.map((bed) => (
                <Badge
                  key={bed.id}
                  variant="outline"
                  className="px-6 py-2 border-primary"
                >
                  {bed.name}
                  <button
                    onClick={() => mutateAsync({ id: bed.id })}
                    className="absolute right-1 top-1/2 -translate-y-1/2 hover:bg-destructive/10 rounded-full p-1.5 cursor-pointer"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </CardContent>
        ) : (
          <CardContent>داده ای برای نمایش وجود ندارد</CardContent>
        )}
      </Card>
    </div>
  );
};

export default BedsList;
