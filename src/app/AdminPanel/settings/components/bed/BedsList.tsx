import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X } from "lucide-react";
import { useState } from "react";
import { useBeds } from "../../services/useSetting";
import CardPagination from "../../../../../components/card/CardPagination";

const BedsList = () => {
  const [currentBedPage, setCurrentBedPage] = useState(1);

  const { getBeds, deleteBed } = useBeds(currentBedPage)

  const PageCount = getBeds.data?.count ? Math.ceil(getBeds.data.count / 10) : 0;

  return (
    <div className="flex flex-col gap-10">
      <Card className=" border-2 border-primary bg-primary/10">
        <CardHeader>
          <CardTitle className="text-secondary">نوع اتاق های اضافه شده</CardTitle>
        </CardHeader>
        {getBeds.data ? (
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {getBeds.data.results.map((bed) => (
                <Badge
                  key={bed.id}
                  variant="outline"
                  className="px-6 py-2 border-primary relative pr-10"
                >
                  {bed.name}
                  <button
                    onClick={() => deleteBed.mutateAsync({ id: bed.id })}
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
        <CardPagination
          currentPage={currentBedPage}
          onPageChange={setCurrentBedPage}
          pageCount={PageCount}
        />
      </Card>
    </div>
  );
};

export default BedsList;
