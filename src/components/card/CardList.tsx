import React, { useState } from "react";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import ListPagination from "../list/ListPagination";
import type { TPaginatedResponse } from "@/types";
import CustomCard, { type Tdata } from "@/components/card/CustomCard";
import { Card } from "../ui/card";

interface Props {
  onAdd: () => void;
  OnEdit: (id: number) => void;
  onDelete: (id: number) => void;
  data?: TPaginatedResponse<Tdata>;
}

const CardList = ({ onAdd, data, OnEdit, onDelete }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);

  const pageCount = data?.count ? Math.ceil(data.count / 10) : 0;

  return (
    <>
      <div className="flex justify-end">
        <Button
          onClick={onAdd}
          variant="outline"
          className="mb-3 border-green-600 text-green-600 hover:bg-green-50 hover:text-green-600 w-full sm:w-auto"
        >
          <Plus />
          افزودن
        </Button>
      </div>

      <Card className="bg-primary-10 px-5">
        <div>
          {data ? (
            <CustomCard
              data={data}
              onEdit={(id: number) => OnEdit(id)}
              onDelete={(id: number) => onDelete(id)}
            />
          ) : (
            <div className="flex flex-col justify-center items-center">
              <img
                src="/No data-amico.svg"
                alt="no-data"
                className="w-50 h-50 "
              />
              <span>داده ای وجود ندارد!</span>
            </div>
          )}
        </div>
        <ListPagination
          currentPage={currentPage}
          pageCount={pageCount}
          onPageChange={setCurrentPage}
        />
      </Card>
    </>
  );
};

export default CardList;
