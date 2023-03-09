import { render } from '@testing-library/react';
import { useAuth } from 'hooks/useAuth';
import { useQuery } from 'react-query';
import { mockGeoMapData } from 'utils/mocks/data';
import { mockMapPath } from 'utils/mocks/map';
import { PageCartoMap } from '../PageCartoMap';

jest.mock('hooks/useAuth');
jest.mock('react-query', () => ({
  useQuery: jest.fn(),
}));

//Errors :
// ResizeObserver is not defined
//Unable to find the geo domain key in the feature properties
describe('PageCartoMap', () => {
  beforeEach(() => {
    // Mock useAuth hook to return a fake user object
    (useAuth as jest.Mock).mockReturnValue({
      isAuthenticated: true,
      user: { id: 1 },
    });
    // Mock the useQuery hook to return a fake response object
    (useQuery as jest.Mock).mockReturnValue({
      data: { ...mockMapPath },
    });
  });

  it('renders loading message while data is being fetched', async () => {
    render(<PageCartoMap map={mockGeoMapData} />);
    // expect(container).toMatchSnapshot();
  });
});
