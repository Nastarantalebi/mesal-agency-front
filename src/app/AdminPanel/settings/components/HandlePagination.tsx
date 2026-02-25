import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  pageCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const HandlePagination = ({ pageCount, currentPage, onPageChange }: Props) => {
  return (
    <div className="flex flex-row items-end justify-end ml-5 gap-0.5 ">
      <Button
        size={"icon-sm"}
        className={
          currentPage === 1
            ? "pointer-events-none opacity-50 rounded-full bg-primary/20 hover:bg-primary/40"
            : "rounded-full bg-primary/20 hover:bg-primary/40"
        }
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
      >
        <ChevronRight />
      </Button>
      <Button
        size={"icon-sm"}
        className={
          currentPage === pageCount
            ? "pointer-events-none opacity-50 rounded-full bg-primary/20 hover:bg-primary/40"
            : "rounded-full bg-primary/20 hover:bg-primary/40"
        }
        onClick={() => currentPage < pageCount && onPageChange(currentPage + 1)}
      >
        <ChevronLeft />
      </Button>
    </div>
  );
};

export default HandlePagination;
