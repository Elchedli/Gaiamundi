import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useAuth } from 'hooks/useAuth';
import { QueryClient, QueryClientProvider } from 'react-query';
import { mockUser } from 'utils/mocks/data';
import { CsvUploader } from '../CsvUploader';

jest.mock('hooks/useAuth');

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

describe('CsvUploader', () => {
  beforeEach(() => {
    (useAuth as jest.Mock).mockImplementation(() => ({
      isAuthenticated: true,
      user: mockUser,
    }));
  });

  const onUploadMock = jest.fn();
  const onParseMock = jest.fn();
  const onCancelMock = jest.fn();
  const onChangeMock = jest.fn();

  it('should upload a CSV file and click  on cancel button when upload is successful', async () => {
    const file = new File(['a,b,c\n1,2,3'], 'file.csv', { type: 'text/csv' });
    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <CsvUploader
          onUpload={onUploadMock}
          onParse={onParseMock}
          onCancel={onCancelMock}
          onChange={onChangeMock}
        />
      </QueryClientProvider>
    );
    const fileInput = await screen.findByTestId('hidden-file-input');
    userEvent.upload(fileInput, file);
    const loadedFilePage = await screen.findByTestId('loadedFilePage');
    expect(loadedFilePage).toBeInTheDocument();
    userEvent.click(loadedFilePage.querySelector('button') as HTMLElement);
    expect(container.contains(loadedFilePage)).not.toBeTruthy();
  });
});
