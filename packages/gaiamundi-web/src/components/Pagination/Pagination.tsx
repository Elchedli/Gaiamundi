import { Button } from 'components/Button/Button';

interface PaginationProps {
  page: number;
  totalPages: number;
  onPaginate: (p: number) => void;
}

export const Pagination = (props: PaginationProps) => {
  const { page, totalPages, onPaginate } = props;
  const isPageLessTotal = page < totalPages;
  return (
    <div className="flex flex-row mt-5" data-testid="pagination">
      {page > 1 && (
        <Button
          className="mr-3"
          data-testid="pagination-previous"
          onClick={() => onPaginate(page - 1)}
        >
          {'< Précédent'}
        </Button>
      )}
      {page > 2 && <Button onClick={() => onPaginate(1)}>1</Button>}
      {page > 1 && (
        <Button className="mx-2" onClick={() => onPaginate(page - 1)}>
          {page - 1}
        </Button>
      )}
      <Button className="bg-gray-200" disabled>
        {page}
      </Button>
      {isPageLessTotal && (
        <Button className="mx-2" onClick={() => onPaginate(page + 1)}>
          {page + 1}
        </Button>
      )}
      {page < totalPages - 1 && (
        <Button onClick={() => onPaginate(totalPages)}>{totalPages}</Button>
      )}
      {isPageLessTotal && (
        <Button
          className="ml-3"
          data-testid="pagination-next"
          onClick={() => onPaginate(page + 1)}
        >
          {'Suivant >'}
        </Button>
      )}
    </div>
  );
};
