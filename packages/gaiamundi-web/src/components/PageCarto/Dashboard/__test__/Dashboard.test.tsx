import { render } from '@testing-library/react';
import { useAuth } from 'hooks/useAuth';
import { mockUser } from 'utils/mocks/data';
import { Dashboard } from '../Dashboard';
import { FilterBar } from '../FilterBar';

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
  it('renders without error', () => {
    render(<Dashboard />);
  });
  it('render component filter bar whithout error', () => {
    const safeChangeSearchInput = jest.fn();
    const safeChangeTags = jest.fn();
    const { getByTestId } = render(
      <FilterBar
        onSearchKeywordChange={safeChangeSearchInput}
        onTagChange={safeChangeTags}
      />
    );
    expect(getByTestId(safeChangeSearchInput)).toBeInTheDocument();
    expect(getByTestId(safeChangeTags)).toBeInTheDocument();
  });
});
