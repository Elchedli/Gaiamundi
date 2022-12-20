import { Button } from 'components/Button/Button';

interface PaginationProps {
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
}

export const Pagination = (props: PaginationProps) => {
  const { page, setPage, totalPages } = props;
  const PageLessOne = page < totalPages - 1;
  const PageLessTotal = page < totalPages;

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="flex flex-row mt-5">
      {page > 1 && (
        <Button className="mr-3" onClick={() => handlePageChange(page - 1)}>
          {'<'}
        </Button>
      )}
      {page > 2 && <Button onClick={() => handlePageChange(1)}>1</Button>}
      {page > 1 && (
        <Button className="mx-2" onClick={() => handlePageChange(page - 1)}>
          {page - 1}
        </Button>
      )}
      <Button className="bg-gray-200" disabled>
        {page}
      </Button>
      {PageLessTotal && (
        <Button className="mx-2" onClick={() => handlePageChange(page + 1)}>
          {page + 1}
        </Button>
      )}
      {PageLessOne && (
        <Button onClick={() => handlePageChange(totalPages)}>
          {totalPages}
        </Button>
      )}
      {PageLessTotal && (
        <Button className="ml-3" onClick={() => handlePageChange(page + 1)}>
          {'>'}
        </Button>
      )}
    </div>
  );
};
