import { fireEvent, render } from '@testing-library/react';
import { Pagination } from 'components/Pagination/Pagination';

describe('Pagination', () => {
  const onPaginateNextMock = jest.fn();
  const onPaginatePreviousMock = jest.fn();
  const onPaginateMock = jest.fn();
  const page = 4;
  const totalPages = 10;

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders pagination buttons', () => {
    const { getByText } = render(
      <Pagination
        page={page}
        totalPages={totalPages}
        onPaginateNext={onPaginateNextMock}
        onPaginatePrevious={onPaginatePreviousMock}
        onPaginate={onPaginateMock}
      />
    );

    const previousButton = getByText('< Précédent');
    const page1Button = getByText('1');
    const nextPageButton = getByText('3');
    const lastPageButton = getByText('10');
    const nextButton = getByText('Suivant >');

    expect(previousButton).toBeInTheDocument();
    expect(page1Button).toBeInTheDocument();
    expect(nextPageButton).toBeInTheDocument();
    expect(lastPageButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
  });

  test('handles previous and next button clicks', () => {
    const { getByText } = render(
      <Pagination
        page={page}
        totalPages={totalPages}
        onPaginateNext={onPaginateNextMock}
        onPaginatePrevious={onPaginatePreviousMock}
        onPaginate={onPaginateMock}
      />
    );

    const previousButton = getByText('< Précédent');
    const nextPageButton = getByText('Suivant >');

    fireEvent.click(previousButton);
    expect(onPaginatePreviousMock).toHaveBeenCalledTimes(1);

    fireEvent.click(nextPageButton);
    expect(onPaginateNextMock).toHaveBeenCalledTimes(1);
  });

  test('handles page button clicks', () => {
    const { getByText } = render(
      <Pagination
        page={page}
        totalPages={totalPages}
        onPaginateNext={onPaginateNextMock}
        onPaginatePrevious={onPaginatePreviousMock}
        onPaginate={onPaginateMock}
      />
    );

    const firstPageButton = getByText('1');
    const lastPageButton = getByText(totalPages);

    fireEvent.click(firstPageButton);

    expect(onPaginateMock).toHaveBeenCalledWith(1);

    fireEvent.click(lastPageButton);

    expect(onPaginateMock).toHaveBeenCalledWith(totalPages);
  });
});
