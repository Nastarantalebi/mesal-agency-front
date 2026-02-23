import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Props {
  pageCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const ListPagination = ({ pageCount, currentPage, onPageChange }: Props) => {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
            className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer hover:bg-primary/20"}
          />
        </PaginationItem>

        {Array.from({ length: pageCount }, (_, i) => i + 1).map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              isActive={currentPage === page}
              onClick={() => onPageChange(page)}
              className="cursor-pointer hover:bg-primary/20"
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            onClick={() => currentPage < pageCount && onPageChange(currentPage + 1)}
            className={currentPage === pageCount ? "pointer-events-none opacity-50" : "cursor-pointer hover:bg-primary/20"}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default ListPagination;