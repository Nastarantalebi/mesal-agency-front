import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useNavigate, useSearch } from "@tanstack/react-router";

interface Props {
  pageCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const ListPagination = ({ pageCount, currentPage, onPageChange }: Props) => {
  const navigate = useNavigate();
  const searchParams = useSearch({ strict: false }) as Record<string, any>;

  const updatePageParam = (page: number) => {
    navigate({
      search: { ...searchParams, page } as any,
    });
    onPageChange(page);
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => currentPage > 1 && updatePageParam(currentPage - 1)}
            className={
              currentPage === 1
                ? "pointer-events-none opacity-50"
                : "cursor-pointer hover:bg-primary/20"
            }
          />
        </PaginationItem>

        {Array.from({ length: pageCount }, (_, i) => i + 1).map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              isActive={currentPage === page}
              onClick={() => updatePageParam(page)}
              className="cursor-pointer hover:bg-primary/20"
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            onClick={() =>
              currentPage < pageCount && updatePageParam(currentPage + 1)
            }
            className={
              currentPage === pageCount
                ? "pointer-events-none opacity-50"
                : "cursor-pointer hover:bg-primary/20"
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default ListPagination;
