import { Badge } from "@/components/ui/badge";
import { beds_key, beds_url } from "@/data/querykeys";
import useGetData from "@/services/useGetData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { TPaginatedResponse } from "@/types";
import { X } from "lucide-react";
import useDeleteData from "@/services/useDeleteData";
import type { TBedResponse } from "../../types";
import HandlePagination from "../HandlePagination";
import { useState } from "react";

const BedsList = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data: bedsData } = useGetData<TPaginatedResponse<TBedResponse>>({
    key: [beds_key, String(currentPage)],
    url: `${beds_url}?page=${currentPage}`,
  });

  const { mutateAsync } = useDeleteData({
    key: [beds_key, String(currentPage)],
    url: beds_url,
  });

  const PageCount = bedsData?.count ? Math.ceil(bedsData.count / 10) : 0;

  return (
    <div className="flex flex-col gap-10">
      <Card className=" border-2 border-primary bg-primary/10">
        <CardHeader>
          <CardTitle className="text-secondary">نوع اتاق های اضافه شده</CardTitle>
        </CardHeader>
        {bedsData ? (
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {bedsData.results.map((bed) => (
                <Badge
                  key={bed.id}
                  variant="outline"
                  className="px-6 py-2 border-primary relative pr-10"
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
        <HandlePagination
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          pageCount={PageCount}
        />
      </Card>
    </div>
  );
};

export default BedsList;
