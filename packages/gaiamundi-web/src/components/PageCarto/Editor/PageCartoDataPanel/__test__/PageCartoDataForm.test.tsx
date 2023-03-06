import { render, screen } from '@testing-library/react';
import { useAuth } from 'hooks/useAuth';
import { Column } from 'interfaces/column';
import { DatasetStub } from 'interfaces/dataset';
import { User } from 'interfaces/user';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { useMutation } from 'react-query';
import { MemoryRouter as Router } from 'react-router-dom';
import { PageCartoDataForm } from '../PageCartoDataForm';

const server = setupServer(
  rest.post('/add-data-to-page-carto', (req, res, ctx) => {
    return res(ctx.status(201), ctx.json({ success: true }));
  })
);

jest.mock('react-query', () => ({
  ...jest.requireActual('react-query'),
  useMutation: jest.fn(),
  useQueryClient: jest.fn(),
}));

const mockUseMutation = useMutation as jest.Mock;

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

jest.mock('hooks/useAuth');
jest.mock('react-query', () => ({
  useMutation: jest.fn(),
  useQueryClient: jest.fn(),
}));

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('PageCartoDataForm', () => {
  beforeEach(() => {
    (useAuth as jest.Mock).mockImplementation(() => ({
      isAuthenticated: true,
      user: user,
    }));
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the correct text elements', async () => {
    mockUseMutation.mockReturnValue({
      invoke: jest.fn(),
      result: { loading: false },
      reset: jest.fn(),
    });

    const { container } = render(
      <Router>
        <PageCartoDataForm
          pageCartoId={0}
          onSubmit={function (
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            dataForm: DatasetStub & { fragmentName: string; columns: Column[] }
          ): void {
            throw new Error('Function not implemented.');
          }}
        />
      </Router>
    );

    expect(
      screen.getByText("1. Uploader des données à partir d'un fichier CSV")
    ).toBeInTheDocument();
    expect(screen.getByText('Nom du jeu de données')).toBeInTheDocument();
    expect(
      screen.getByText('Attention: Risque de non conformité')
    ).toBeInTheDocument();
    expect(screen.getByText('Valider')).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });
});
