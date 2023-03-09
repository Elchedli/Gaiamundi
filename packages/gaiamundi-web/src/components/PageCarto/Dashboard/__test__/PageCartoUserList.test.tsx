import { fireEvent, render } from '@testing-library/react';
import { useAuth } from 'hooks/useAuth';
import { ApiCollection } from 'interfaces/api';
import { PageCarto } from 'interfaces/page-carto';
import { useQuery } from 'react-query';
import { MemoryRouter as Router } from 'react-router-dom';
import { mockPageCartoData, mockUser } from 'utils/mocks/data';
import { PageCartoUserList } from '../PageCartoUserList';

jest.mock('hooks/useAuth');
jest.mock('react-query', () => ({
  useQuery: jest.fn(),
}));

describe('PageCartoUserList', () => {
  beforeEach(() => {
    (useAuth as jest.Mock).mockImplementation(() => ({
      isAuthenticated: true,
      user: mockUser,
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

    const { container, getByTestId } = render(
      <PageCartoUserList nameInput="" tagSelected={[]} />
    );

    expect(getByTestId('loading-message')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
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

    const { container, getByText } = render(
      <PageCartoUserList nameInput="" tagSelected={[]} />
    );

    expect(getByText(mockError.message)).toBeInTheDocument();
    expect(container).toMatchSnapshot();
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

    const { container, getByTestId } = render(
      <PageCartoUserList nameInput="" tagSelected={[]} />
    );

    expect(getByTestId('error-message')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
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

    const { container, getByText, getByTestId } = render(
      <Router>
        <PageCartoUserList nameInput="" tagSelected={[]} />
      </Router>
    );

    const pagination = getByTestId('pagination');

    pageCartos.data.forEach((pageCarto) => {
      expect(getByText(pageCarto.attributes.name)).toBeInTheDocument();
    });
    expect(pagination.children).toHaveLength(3);
    expect(pagination.children[0].textContent).toEqual('1');
    expect(pagination.children[1].textContent).toEqual('2');

    fireEvent.click(pagination.children[1]);

    expect((useQuery as jest.Mock).mock.calls[0][0].queryKey[1]).toBe(1);
    expect(container).toMatchSnapshot();
  });
});
