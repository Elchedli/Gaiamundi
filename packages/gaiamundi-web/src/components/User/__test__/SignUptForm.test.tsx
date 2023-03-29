import { fireEvent, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useAuth } from 'hooks/useAuth';
import { useToast } from 'hooks/useToast';
import { QueryClient, QueryClientProvider, useMutation } from 'react-query';
import SignUpForm from '../SignUpForm';

jest.mock('hooks/useAuth');
jest.mock('react-query');
jest.mock('hooks/useToast');

const queryClient = new QueryClient();

describe('SignUpForm', () => {
  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({
      authenticate: jest.fn(),
    });
    (useMutation as jest.Mock).mockReturnValue({
      mutateAsync: jest.fn(),
      isError: false,
      error: null,
      isLoading: false,
    });
    (useToast as jest.Mock).mockReturnValue({
      addToast: jest.fn(),
    });
  });

  it('renders and submits form correctly', async () => {
    const { getByText, getByLabelText, getByRole } = render(
      <QueryClientProvider client={queryClient}>
        <SignUpForm />
      </QueryClientProvider>
    );
    userEvent.type(getByLabelText('Nom'), 'Jean Dupond');
    userEvent.type(getByLabelText('Addresse E-mail'), 'JeanDupond@example.com');
    userEvent.type(getByLabelText('Mot de passe'), 'password123');
    userEvent.type(
      getByLabelText('Confirmation du mot de passe'),
      'password123'
    );

    const checkbox = getByRole('checkbox');
    fireEvent.click(checkbox);

    const mutateAsync = (useMutation as jest.Mock).mock.results[0].value
      .mutateAsync;
    fireEvent.click(getByText('Créer un compte'));

    await waitFor(() => {
      expect(mutateAsync).toHaveBeenCalledTimes(1);
    });
  });
});
