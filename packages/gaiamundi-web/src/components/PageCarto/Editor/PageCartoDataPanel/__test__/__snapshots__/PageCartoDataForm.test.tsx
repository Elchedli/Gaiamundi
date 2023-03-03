import { fireEvent, render, waitFor } from '@testing-library/react';
import { useAuth } from 'hooks/useAuth';
import { User } from 'interfaces/user';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { PageCartoDataForm } from '../../PageCartoDataForm';
const server = setupServer(
  rest.post('/add-data-to-page-carto', (req, res, ctx) => {
    return res(ctx.status(201), ctx.json({ success: true }));
  })
);
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
  useQuery: jest.fn(),
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
  test('submitting the form calls the mutation function with the form data', async () => {
    const mockOnSubmit = jest.fn();
    const { getByLabelText, getByRole } = render(
      <PageCartoDataForm pageCartoId={1} onSubmit={mockOnSubmit} />
    );

    const nameInput = getByLabelText(/nom du jeu de données/i);
    fireEvent.change(nameInput, { target: { value: 'test dataset' } });

    const uploadButton = getByRole('button', { name: /uploader des données/i });
    fireEvent.click(uploadButton);

    const parseButton = getByRole('button', { name: /détecter les colonnes/i });
    fireEvent.click(parseButton);

    const submitButton = getByRole('button', { name: /valider/i });
    fireEvent.click(submitButton);

    await waitFor(() => expect(mockOnSubmit).toHaveBeenCalledTimes(1));
  });
});
