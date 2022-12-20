import { Button } from 'components/Button/Button';

interface PaginationProps {
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
}

export const Pagination = (props: PaginationProps) => {
  const { page, setPage, totalPages } = props;

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };
  const PageLessOne = page < totalPages - 1;
  const PageLessTotal = page < totalPages;
  return (
    <div className="flex flex-row mt-5">
      {page > 1 && (
        <Button onClick={() => handlePageChange(page - 1)}>
          Previous page
        </Button>
      )}
      {page > 2 && <Button onClick={() => handlePageChange(1)}>1</Button>}
      {page > 2 && <span>...</span>}
      {page > 1 && (
        <Button onClick={() => handlePageChange(page - 1)}>{page - 1}</Button>
      )}
      <Button className="bg-gray-200" disabled>
        {page}
      </Button>
      {PageLessTotal && (
        <Button onClick={() => handlePageChange(page + 1)}>{page + 1}</Button>
      )}
      {PageLessOne && <span>...</span>}
      {PageLessOne && (
        <Button onClick={() => handlePageChange(totalPages)}>
          {totalPages}
        </Button>
      )}
      {PageLessTotal && (
        <Button onClick={() => handlePageChange(page + 1)}>Next page</Button>
      )}
    </div>
  );
};
