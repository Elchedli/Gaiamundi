import { render } from '@testing-library/react';
import { useAuth } from 'hooks/useAuth';
import { ApiCollection } from 'interfaces/api';
import { PageCarto } from 'interfaces/page-carto';
import { useMutation, useQuery } from 'react-query';
import { MemoryRouter as Router } from 'react-router-dom';
import { mockPageCartoData, mockUser } from 'utils/mocks/data';
import { PageCartoList } from '../PageCartoList';

// Mock the useQuery hook from react-query
jest.mock('react-query', () => ({
  useMutation: jest.fn(),
  useQuery: jest.fn(),
  useQueryClient: jest.fn(),
}));
jest.mock('hooks/useAuth');

describe('PageCartoList', () => {
  beforeEach(() => {
    (useAuth as jest.Mock).mockImplementation(() => ({
      isAuthenticated: true,
      user: mockUser,
    }));
    (useMutation as jest.Mock).mockImplementation(() => ({
      isError: false,
      error: null,
      isLoading: false,
    }));
  });
  test('Renders loading message when data is loading', () => {
    // Mock the useQuery hook
    (useQuery as jest.Mock).mockReturnValue({ isLoading: true });
    const { getByTestId } = render(
      <Router>
        <PageCartoList />
      </Router>
    );
    expect(getByTestId('loading-message')).toBeInTheDocument();
  });

  test('Renders error message when data fetching fails', () => {
    const error = { message: 'Test error' };
    (useQuery as jest.Mock).mockReturnValue({ isError: true, error });
    const { getByText } = render(
      <Router>
        <PageCartoList />
      </Router>
    );
    expect(getByText(error.message)).toBeInTheDocument();
  });

  test('Renders info message when there is no data', () => {
    (useQuery as jest.Mock).mockReturnValue({ data: { data: [], meta: {} } });
    const { getByText } = render(
      <Router>
        <PageCartoList />
      </Router>
    );
    expect(getByText('Aucun contenu à afficher.')).toBeInTheDocument();
  });

  test('Renders page carto items when there is data', () => {
    const pageCartos: ApiCollection<PageCarto> = {
      data: Array.from({ length: 2 }, (_, index) => ({
        ...mockPageCartoData,
        id: index + 1,
        name: `Test pageCarto ${index + 1}`,
      })),
      meta: {
        pagination: {
          pageCount: 2,
          total: 12,
        },
      },
    };
    (useQuery as jest.Mock).mockReturnValue({
      data: pageCartos,
    });
    const { getByText } = render(
      <Router>
        <PageCartoList />
      </Router>
    );
    pageCartos.data.forEach((pageCarto) => {
      expect(getByText(pageCarto.name)).toBeInTheDocument();
    });
  });

  test('Renders pagination when there is data', () => {
    const pageCartos = {
      data: Array.from({ length: 12 }, (_, index) => ({
        ...mockPageCartoData,
        id: index + 1,
        name: `Test pageCarto ${index + 1}`,
      })),
      meta: {
        pagination: {
          pageCount: 2,
          total: 12,
        },
      },
    };
    (useQuery as jest.Mock).mockReturnValue({
      data: pageCartos,
    });

    const { getByTestId } = render(
      <Router>
        <PageCartoList />
      </Router>
    );
    const pagination = getByTestId('pagination');
    expect(pagination.children).toHaveLength(3);
    expect(pagination.children[0].textContent).toEqual('1');
    expect(pagination.children[1].textContent).toEqual('2');
  });
});
