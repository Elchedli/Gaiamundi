import { fireEvent, render } from '@testing-library/react';
import { Pagination } from 'components/Pagination/Pagination';

describe('Pagination', () => {
  const onPaginateMock = jest.fn();
  const page = 4;
  const totalPages = 10;

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders pagination buttons', () => {
    const { getByText, getByTestId } = render(
      <Pagination
        page={page}
        totalPages={totalPages}
        onPaginate={onPaginateMock}
      />
    );

    const previousButton = getByTestId('pagination-previous');
    const page1Button = getByText('1');
    const nextPageButton = getByText('3');
    const lastPageButton = getByText('10');
    const nextButton = getByTestId('pagination-next');

    expect(previousButton).toBeInTheDocument();
    expect(page1Button).toBeInTheDocument();
    expect(nextPageButton).toBeInTheDocument();
    expect(lastPageButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
  });

  test('handles previous and next button clicks', () => {
    const { getByTestId } = render(
      <Pagination
        page={page}
        totalPages={totalPages}
        onPaginate={onPaginateMock}
      />
    );

    fireEvent.click(getByTestId('pagination-previous'));
    expect(onPaginateMock).toHaveBeenCalledTimes(1);

    fireEvent.click(getByTestId('pagination-next'));
    expect(onPaginateMock).toHaveBeenCalledTimes(2);
  });

  test('handles page button clicks', () => {
    const { getByText } = render(
      <Pagination
        page={page}
        totalPages={totalPages}
        onPaginate={onPaginateMock}
      />
    );

    fireEvent.click(getByText('1'));

    expect(onPaginateMock).toHaveBeenCalledWith(1);

    fireEvent.click(getByText(totalPages));

    expect(onPaginateMock).toHaveBeenCalledWith(totalPages);
  });
});
