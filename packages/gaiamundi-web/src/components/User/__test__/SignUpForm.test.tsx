import { act, fireEvent, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useAuth } from 'hooks/useAuth';
import { useToast } from 'hooks/useToast';
import { useMutation } from 'react-query';
import SignUpForm from '../SignUpForm';

jest.mock('hooks/useAuth');
jest.mock('react-query');
jest.mock('hooks/useToast');
jest.mock('react-router-dom');

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
    const { getByTestId } = render(<SignUpForm />);
    userEvent.type(getByTestId('name-input'), 'Jean Dupond');
    userEvent.type(getByTestId('email-input'), 'JeanDupond@example.com');
    userEvent.type(getByTestId('password-input'), 'password123');
    userEvent.type(getByTestId('confirm-password-input'), 'password123');

    const checkbox = getByTestId('checkbox');

    await act(async () => {
      fireEvent.click(checkbox);
    });

    const mutateAsync = (useMutation as jest.Mock).mock.results[0].value
      .mutateAsync;

    await act(async () => {
      fireEvent.click(getByTestId('submit-button'));
    });

    waitFor(() => {
      expect(mutateAsync).toHaveBeenCalledTimes(1);
    });
  });

  it('should not submit form if checkbox is not checked', async () => {
    const { getByTestId } = render(<SignUpForm />);
    userEvent.type(getByTestId('name-input'), 'Jean Dupond');
    userEvent.type(getByTestId('email-input'), 'JeanDupond@example.com');
    userEvent.type(getByTestId('password-input'), 'password123');
    userEvent.type(getByTestId('confirm-password-input'), 'password123');

    const checkbox = getByTestId('checkbox');
    fireEvent.click(checkbox);
    fireEvent.click(checkbox);

    const mutateAsync = (useMutation as jest.Mock).mock.results[0].value
      .mutateAsync;
    fireEvent.click(getByTestId('submit-button'));

    await waitFor(() => {
      expect(mutateAsync).toHaveBeenCalledTimes(0);
    });
  });
});
