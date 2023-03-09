import { render } from '@testing-library/react';
import { useAuth } from 'hooks/useAuth';
import { useQuery } from 'react-query';
import { mockUser } from 'utils/mocks/data';
import { Dashboard } from '../Dashboard';

jest.mock('react-query', () => ({
  useQuery: jest.fn(),
}));

jest.mock('hooks/useAuth');

describe('Dashboard', () => {
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
