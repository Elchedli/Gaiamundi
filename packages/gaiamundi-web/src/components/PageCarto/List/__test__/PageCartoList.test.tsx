import { render, screen } from '@testing-library/react';
import { ApiCollection } from 'interfaces/api';
import { PageCarto } from 'interfaces/page-carto';
import { useQuery } from 'react-query';
import { MemoryRouter as Router } from 'react-router-dom';
import { mockPageCartoData } from 'utils/mocks/data';
import { PageCartoList } from '../PageCartoList';

// Mock the useQuery hook from react-query
jest.mock('react-query');

describe('PageCartoList', () => {
  test('Renders loading message when data is loading', () => {
    // Mock the useQuery hook
    (useQuery as jest.Mock).mockReturnValue({ isLoading: true });
    render(
      <Router>
        <PageCartoList />
      </Router>
    );
    expect(screen.getByText('Loading ...')).toBeInTheDocument();
  });

  test('Renders error message when data fetching fails', () => {
    const error = { message: 'Test error' };
    (useQuery as jest.Mock).mockReturnValue({ isError: true, error });
    render(
      <Router>
        <PageCartoList />
      </Router>
    );
    expect(screen.getByText(error.message)).toBeInTheDocument();
  });

  test('Renders info message when there is no data', () => {
    (useQuery as jest.Mock).mockReturnValue({ data: { data: [], meta: {} } });
    render(
      <Router>
        <PageCartoList />
      </Router>
    );
    expect(screen.getByText('Aucun contenu à afficher.')).toBeInTheDocument();
  });

  test('Renders page carto items when there is data', () => {
    const pageCartos: ApiCollection<PageCarto> = {
      data: Array.from({ length: 2 }, (_, index) => ({
        id: index + 1,
        attributes: {
          ...mockPageCartoData.attributes,
          name: `Test pageCarto ${index + 1}`,
        },
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
    render(
      <Router>
        <PageCartoList />
      </Router>
    );
    pageCartos.data.forEach((pageCarto) => {
      expect(screen.getByText(pageCarto.attributes.name)).toBeInTheDocument();
    });
  });

  test('Renders pagination when there is data', () => {
    const pageCartos = {
      data: Array.from({ length: 12 }, (_, index) => ({
        id: index + 1,
        attributes: {
          ...mockPageCartoData.attributes,
          name: `Test pageCarto ${index + 1}`,
        },
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

    render(
      <Router>
        <PageCartoList />
      </Router>
    );

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });
});
