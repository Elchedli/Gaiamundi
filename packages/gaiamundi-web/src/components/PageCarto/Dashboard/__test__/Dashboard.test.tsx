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

  it('should render a loading message when loading', () => {
    (useQuery as jest.Mock).mockImplementation(() => ({
      data: { data: [] },
      isError: false,
      error: null,
      isLoading: true,
    }));

    const { getByTestId } = render(<Dashboard />);

    expect(
      getByTestId('page-carto-user-list-loading-message')
    ).toBeInTheDocument();
  });

  it('should render an error message when one occurs', () => {
    const mockError = {
      message: 'An error occurred',
      statusCode: 500,
    };

    (useQuery as jest.Mock).mockImplementation(() => ({
      data: { data: [] },
      isError: true,
      error: mockError,
      isLoading: false,
    }));

    const { getByTestId } = render(<Dashboard />);

    expect(
      getByTestId('pagecarto-user-list-error-message')
    ).toBeInTheDocument();
  });

  it('should render an error message when there is no data', () => {
    (useQuery as jest.Mock).mockImplementation(() => ({
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
    }));

    const { getByTestId } = render(<Dashboard />);

    expect(
      getByTestId('pagecarto-user-list-error-message')
    ).toBeInTheDocument();
  });
});
