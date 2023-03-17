import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useAuth } from 'hooks/useAuth';
import { QueryClient, QueryClientProvider } from 'react-query';
import { mockUser } from 'utils/mocks/data';
import { CsvUploader } from '../CsvUploader';

jest.mock('hooks/useAuth');

jest.mock('services/page-carto', () => {
  return {
    uploadCsv(_file: File, _ref: string) {
      return Promise.resolve({});
    },
  };
});

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

  it('should upload a CSV file and click on cancel button when upload is successful', async () => {
    const file = new File(['a,b,c\n1,2,3'], 'file.csv', { type: 'text/csv' });
    const { container, getByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <CsvUploader
          onUpload={onUploadMock}
          onParse={onParseMock}
          onCancel={onCancelMock}
          onChange={onChangeMock}
        />
      </QueryClientProvider>
    );

    const fileInput = getByTestId('hidden-file-input') as HTMLInputElement;

    expect(fileInput).toBeInTheDocument();

    //upload file so we can open the mini page that contains a name and a red cancel button
    userEvent.upload(fileInput, file);
    expect(fileInput.files).toHaveLength(1);
    expect(fileInput?.files?.item(0)).toStrictEqual(file);

    await waitFor(() => {
      // wait for the file thumbnail when the upload and criteria are successful
      const loadedFilePage = getByTestId('file-thumbnail');
      expect(loadedFilePage).toBeInTheDocument();
      //click on the cancel button to get back to the dropZone component
      userEvent.click(loadedFilePage.querySelector('button') as HTMLElement);
      //check if the file-thumbnail is removed
      expect(container.contains(loadedFilePage)).not.toBeTruthy();
    });
  });
});
