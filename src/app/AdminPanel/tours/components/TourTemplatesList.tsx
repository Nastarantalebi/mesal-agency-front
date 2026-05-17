import { useState } from "react";
import useTour from "../services/useTour";
import TourTemplateCard from "./TourTemplateCard";
import { Card } from "@/components/ui/card";
import ListPagination from "@/components/list/ListPagination";

const TourTemplatesList = () => {
  const [currentTourPage, setCurrentTourPage] = useState(1);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const { getTours } = useTour({ currentTourPage: currentTourPage });

  const pageCount = getTours.data?.count
    ? Math.ceil(getTours.data.count / 10)
    : 0;

  console.log("selectedId", selectedId);

  return (
    <Card className="bg-primary-20/30">
      {" "}
      <div className="grid grid-cols-4 px-7">
        {getTours.data?.results.map((tour) => (
          <TourTemplateCard
            tour={tour}
            onClick={(id: number) => {
              setSelectedId(id);
            }}
          />
        ))}
      </div>
      <ListPagination
        currentPage={currentTourPage}
        pageCount={pageCount}
        onPageChange={setCurrentTourPage}
      />
    </Card>
  );
};

export default TourTemplatesList;
