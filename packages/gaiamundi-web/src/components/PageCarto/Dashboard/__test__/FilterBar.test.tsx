import { fireEvent, render, waitFor } from '@testing-library/react';
import { FilterBar } from 'components/PageCarto/Dashboard/FilterBar';
import { useAuth } from 'hooks/useAuth';
import { useQuery } from 'react-query';
import { mockTags, mockUser } from 'utils/mocks/data';

const props = {
  onSearchKeywordChange: jest.fn(),
  onTagChange: jest.fn(),
};
jest.mock('react-query', () => ({
  useQuery: jest.fn(),
}));

jest.mock('hooks/useAuth');
jest.mock('react-query');

describe('FilterBar', () => {
  beforeEach(() => {
    (useAuth as jest.Mock).mockImplementation(() => ({
      isAuthenticated: true,
      user: mockUser,
    }));
    (useQuery as jest.Mock).mockImplementation(() => ({
      data: { data: [...mockTags] },
    }));
  });

  it('should render without error', () => {
    render(<FilterBar {...props} />);
  });

  it('should pass the onSearchKeywordChange prop', async () => {
    const { getByTestId } = render(<FilterBar {...props} />);
    const input = getByTestId('search-input');
    expect(input).toBeInTheDocument();
    fireEvent.change(input, { target: { value: 'Yes' } });
    await new Promise((r) => setTimeout(r, 500));
    expect(props.onSearchKeywordChange).toHaveBeenCalled();
  });

  it('should pass the onTagChange prop', async () => {
    const { getByText } = render(<FilterBar {...props} />);
    const [tagName1, tagName2] = [mockTags[0].name, mockTags[1].name];
    const tag1 = getByText(tagName1);
    const tag2 = getByText(tagName2);
    expect(tag1).toBeInTheDocument();
    expect(tag2).toBeInTheDocument();

    await waitFor(() => {
      fireEvent.click(getByText(tagName1));
      fireEvent.click(getByText(tagName2));
    });
    expect(props.onTagChange).toHaveBeenCalledWith([1, 2]);
  });
  it('should return the loading message', () => {
    (useQuery as jest.Mock).mockImplementation(() => ({
      data: { data: [] },
      isError: false,
      error: null,
      isLoading: true,
    }));
    const { getByTestId } = render(<FilterBar {...props} />);
    const loadingMessage = getByTestId('filter-bar-loading-message');
    expect(loadingMessage).toBeInTheDocument();
  });
  it('should return the error message', () => {
    const mockError = {
      message: 'An error occurred',
      statusCode: 500,
    };
    (useQuery as jest.Mock).mockImplementation(() => ({
      data: null,
      isError: true,
      error: mockError,
      isLoading: false,
    }));
    const { getByTestId } = render(<FilterBar {...props} />);
    const errorMessage = getByTestId('error-message');
    expect(errorMessage).toBeInTheDocument();
  });
  it('should handle empty data', () => {
    (useQuery as jest.Mock).mockImplementation(() => ({
      data: { data: [] },
      isError: false,
      error: null,
      isLoading: false,
    }));
    const { getByTestId } = render(<FilterBar {...props} />);
    const emptyMessage = getByTestId('empty-message');
    expect(emptyMessage).toBeInTheDocument();
  });
  it('should return data', () => {
    (useQuery as jest.Mock).mockImplementation(() => ({
      data: { data: [...mockTags] },
      isError: false,
      error: null,
      isLoading: false,
    }));
    const { getByTestId } = render(<FilterBar {...props} />);
    const TagsFilter = getByTestId('tags-filter');
    expect(TagsFilter).toBeInTheDocument();
  });
});
