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
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should render whithout error', () => {
    (useQuery as jest.Mock).mockImplementation(() => ({
      data: { data: [] },
      isError: false,
      error: null,
      isLoading: false,
    }));
    render(<Dashboard />);
  });
  it('should render FilterBar component', () => {
    (useQuery as jest.Mock).mockImplementation(() => ({
      data: { data: [] },
      isError: false,
      error: null,
      isLoading: false,
    }));
    const { getByTestId } = render(<Dashboard />);
    const filterBar = getByTestId('filter-bar');
    expect(filterBar).toBeInTheDocument();
  });
  it('should render PageCartoUserList component', () => {
    (useQuery as jest.Mock).mockImplementation(() => ({
      data: { data: [] },
      isError: false,
      error: null,
      isLoading: false,
    }));
    const { getByTestId } = render(<Dashboard />);
    const pageCartoUserList = getByTestId('page-carto-user-list');
    expect(pageCartoUserList).toBeInTheDocument();
  });
});
