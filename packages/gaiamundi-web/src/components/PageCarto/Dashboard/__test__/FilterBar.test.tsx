import { fireEvent, render } from '@testing-library/react';
import { FilterBar } from 'components/PageCarto/Dashboard/FilterBar';
import { useAuth } from 'hooks/useAuth';
import { useQuery } from 'react-query';
import { mockUser } from 'utils/mocks/data';
import { Dashboard } from '../Dashboard';

const props = {
  onSearchKeywordChange: jest.fn(),
  onTagChange: jest.fn(),
};

jest.mock('hooks/useAuth');
describe('FilterBar', () => {
  test('renders without error', () => {
    render(<FilterBar {...props} />);
  });
  it('passes onSearchKeywordChange prop', async () => {
    const { getByPlaceholderText } = render(<FilterBar {...props} />);
    const input = getByPlaceholderText('Recherche ...');
    expect(input).toBeInTheDocument();
    fireEvent.change(input, { target: { value: 'Yes' } });
    await new Promise((r) => setTimeout(r, 500));
    expect(props.onSearchKeywordChange).toHaveBeenCalled();
  });

  it('passes onTagChange prop', () => {
    const { getByText } = render(<FilterBar {...props} />);
    const tag1 = getByText('Tag A');
    const tag2 = getByText('Tag B');
    expect(tag1).toBeInTheDocument();
    expect(tag2).toBeInTheDocument();
    getByText('Tag A').click();
    fireEvent.click(getByText('Tag A'));
    fireEvent.click(getByText('Tag B'));
    expect(props.onTagChange).toHaveBeenCalledWith([1, 2]);
  });

  beforeEach(() => {
    (useAuth as jest.Mock).mockImplementation(() => ({
      isAuthenticated: true,
      user: mockUser,
    }));
  });

  it('renders loading message when loading', () => {
    (useQuery as jest.Mock).mockReturnValueOnce({
      data: null,
      isError: false,
      error: null,
      isLoading: true,
    });

    const { getByTestId } = render(<Dashboard />);

    expect(getByTestId('loading-message')).toBeInTheDocument();
  });

  it('renders error message when there is an error', () => {
    const mockError = {
      message: 'An error occurred',
      statusCode: 500,
    };

    (useQuery as jest.Mock).mockReturnValueOnce({
      data: null,
      isError: true,
      error: mockError,
      isLoading: false,
    });

    const { getByText } = render(<Dashboard />);

    expect(getByText(mockError.message)).toBeInTheDocument();
  });

  it('renders message when there is no data', () => {
    (useQuery as jest.Mock).mockReturnValueOnce({
      data: {
        data: [],
        meta: {
          pagination: {
            pageCount: 0,
          },
        },
      },
      isError: false,
      error: null,
      isLoading: false,
    });

    const { getByTestId } = render(<Dashboard />);

    expect(getByTestId('error-message')).toBeInTheDocument();
  });
});
