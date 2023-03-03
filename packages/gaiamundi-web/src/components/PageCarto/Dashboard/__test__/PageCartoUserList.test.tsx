import { fireEvent, render, screen } from '@testing-library/react';
import { useAuth } from 'hooks/useAuth';
import { ApiCollection } from 'interfaces/api';
import { PageCarto } from 'interfaces/page-carto';
import { User } from 'interfaces/user';
import { useQuery } from 'react-query';
import { MemoryRouter as Router } from 'react-router-dom';
import { mockPageCartoData } from 'utils/mocks/data';
import { PageCartoUserList } from '../PageCartoUserList';

jest.mock('hooks/useAuth');

jest.mock('react-query', () => ({
  useQuery: jest.fn(),
}));

const user: User = {
  id: 1,
  confirmed: true,
  blocked: false,
  username: 'testuser',
  email: 'testuser@test.com',
  provider: 'local',
  password: 'testpass',
  created_at: '2022-02-07T00:00:00.000Z',
  updated_at: '2022-02-07T00:00:00.000Z',
};

describe('PageCartoUserList', () => {
  beforeEach(() => {
    (useAuth as jest.Mock).mockImplementation(() => ({
      isAuthenticated: true,
      user: user,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading message when loading', () => {
    (useQuery as jest.Mock).mockReturnValueOnce({
      data: null,
      isError: false,
      error: null,
      isLoading: true,
    });

    render(<PageCartoUserList nameInput="" tagSelected={[]} />);

    expect(screen.getByText('Loading ...')).toBeInTheDocument();
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

    render(<PageCartoUserList nameInput="" tagSelected={[]} />);

    expect(screen.getByText(mockError.message)).toBeInTheDocument();
  });

  it('renders "Aucun contenu à afficher" message when there is no data', () => {
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

    render(<PageCartoUserList nameInput="" tagSelected={[]} />);

    expect(screen.getByText('Aucun contenu à afficher.')).toBeInTheDocument();
  });

  it('renders pages when there is data', () => {
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
          total: 2,
        },
      },
    };
    (useQuery as jest.Mock).mockImplementation(() => ({
      data: pageCartos,
    }));

    render(
      <Router>
        <PageCartoUserList nameInput="" tagSelected={[]} />
      </Router>
    );
    pageCartos.data.forEach((pageCarto) => {
      expect(screen.getByText(pageCarto.attributes.name)).toBeInTheDocument();
    });

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    fireEvent.click(screen.getByText('2'));
    expect((useQuery as jest.Mock).mock.calls[0][0].queryKey[1]).toBe(1);
  });
});
