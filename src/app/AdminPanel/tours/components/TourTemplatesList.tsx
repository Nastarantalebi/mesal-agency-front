import { useState, type Dispatch, type SetStateAction } from "react";
import useTour from "../services/useTour";
import TourTemplateCard from "./TourTemplateCard";
import { Card } from "@/components/ui/card";
import ListPagination from "@/components/list/ListPagination";

const TourTemplatesList = ({
  setSelectedId,
  selectedId,
}: {
  setSelectedId: Dispatch<SetStateAction<number | null>>;
  selectedId: number | null;
}) => {
  const [currentTourPage, setCurrentTourPage] = useState(1);
  const { getTours } = useTour({ currentTourPage: currentTourPage });

  const pageCount = getTours.data?.count
    ? Math.ceil(getTours.data.count / 10)
    : 0;

  return (
    <Card className="bg-primary-20/30">
      <div className="grid grid-cols-4 px-7 gap-2">
        {getTours.data?.results.map((tour) => (
          <TourTemplateCard
            tour={tour}
            setSelectedId={setSelectedId}
            selectedId={selectedId}
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
