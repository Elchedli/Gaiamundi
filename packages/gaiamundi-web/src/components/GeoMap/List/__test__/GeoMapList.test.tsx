import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useAuth } from 'hooks/useAuth';
import { useQuery } from 'react-query';
import { mockGeoMapApiCollection } from 'utils/mocks/data';
import { GeoMapList } from '../GeoMapList';

jest.mock('hooks/useAuth');
jest.mock('react-query', () => ({
  useQuery: jest.fn(),
}));

describe('GeoMapList', () => {
  beforeEach(() => {
    // Mock useAuth hook to return a fake user object
    (useAuth as jest.Mock).mockReturnValue({
      isAuthenticated: true,
      user: { id: 1 },
    });
    // Mock the useQuery hook to return a fake response object
    (useQuery as jest.Mock).mockReturnValue({
      data: { ...mockGeoMapApiCollection },
    });
  });

  it('renders list of GeoListItem components and snapshot', async () => {
    const { container } = render(<GeoMapList />);
    const geoListItemElement = screen.getByText('Test Map 1');
    expect(geoListItemElement).toBeInTheDocument();
    expect(screen.getByText('Mes cartes')).toBeInTheDocument();
    expect(screen.getByText('Toutes les cartes')).toBeInTheDocument();
    expect(container.querySelectorAll('.grid > div').length).toBe(3);
    expect(container).toMatchSnapshot();
  });

  it('switches between tabs', async () => {
    const { container } = render(<GeoMapList />);
    const allMapsTab = screen.getByText('Toutes les cartes');
    userEvent.click(allMapsTab);
    expect(allMapsTab).toHaveClass('bg-white shadow');
    expect(container.querySelectorAll('.grid > div').length).toBe(3);
  });
});
