import { useState, type Dispatch, type SetStateAction } from "react";
import useTour from "../services/useTour";
import TourTemplateCard from "./TourTemplateCard";
import { Card } from "@/components/ui/card";
import ListPagination from "@/components/list/ListPagination";

const TourTemplatesList = ({
  setSelectedId,
  selectedId,
  onChange,
}: {
  setSelectedId: Dispatch<SetStateAction<number | null>>;
  selectedId: number | null;
  onChange: () => void;
}) => {
  const { getTours } = useTour();
  const [currentPage, setCurrentPage] = useState(1);
  const pageCount = getTours.data?.count
    ? Math.ceil(getTours.data.count / 10)
    : 0;

  return (
    <Card className="bg-primary-20 p-3 md:p-5">
      <div className="grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 px-7 gap-2">
        {getTours.data?.results.map((tour) => (
          <TourTemplateCard
            tour={tour}
            setSelectedId={setSelectedId}
            selectedId={selectedId}
            onChange={onChange}
          />
        ))}
      </div>
      <div className="mt-4 md:mt-7 flex justify-center">
        <ListPagination
          currentPage={currentPage}
          pageCount={pageCount}
          onPageChange={setCurrentPage}
        ></ListPagination>
      </div>
    </Card>
  );
};

export default TourTemplatesList;
