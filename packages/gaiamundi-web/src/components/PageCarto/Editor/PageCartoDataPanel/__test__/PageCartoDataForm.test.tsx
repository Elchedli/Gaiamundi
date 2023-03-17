import { act, fireEvent, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useAuth } from 'hooks/useAuth';
import { QueryClient, QueryClientProvider } from 'react-query';
import { MemoryRouter as Router } from 'react-router-dom';
import { mockFileUpload, mockUser } from 'utils/mocks/data';
import { PageCartoDataForm } from '../PageCartoDataForm';

jest.mock('hooks/useAuth');

jest.mock('services/page-carto', () => {
  return {
    uploadCsv() {
      return Promise.resolve(mockFileUpload);
    },
  };
});

describe('PageCartoDataForm', () => {
  beforeEach(() => {
    (useAuth as jest.Mock).mockImplementation(() => ({
      isAuthenticated: true,
      user: mockUser,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the correct dom elements and check input control behaviour', async () => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();

    const file = new File(
      ['testcolumn1,testcolumn2,testcolumn3\nrow1,row2,row3'],
      'file.csv',
      {
        type: 'text/csv',
      }
    );
    const mockDataForm = jest.fn();
    const queryClient = new QueryClient();

    const { getByDisplayValue, getByTestId, container } = render(
      <QueryClientProvider client={queryClient}>
        <Router>
          <PageCartoDataForm pageCartoId={0} onSubmit={mockDataForm} />
        </Router>
      </QueryClientProvider>
    );

    const allFormInputs = container.querySelectorAll('input');
    const fileInput = allFormInputs[0] as HTMLInputElement;

    const originFileTextInput = getByTestId('origin-input') as HTMLInputElement;

    //csvUploader code needed to fill the form
    userEvent.type(originFileTextInput, 'test text');

    expect(originFileTextInput.value).toBe('test text');

    userEvent.upload(fileInput, file);

    await waitFor(() =>
      expect(getByDisplayValue(mockFileUpload.name)).toHaveValue(
        mockFileUpload.name
      )
    );

    const dataGridRow = container.querySelectorAll(
      "div[role='grid']:nth-child(2) > div"
    )[1];

    const columnCheckbox = dataGridRow.querySelector(
      'input[type=checkbox]'
    ) as HTMLInputElement;

    fireEvent.click(columnCheckbox);

    expect(columnCheckbox.checked).toBeTruthy();

    const columnRadio = dataGridRow.querySelector(
      'input[type=radio]'
    ) as HTMLInputElement;

    expect(getByTestId('validateform-button')).toHaveClass(
      'cursor-not-allowed'
    );

    await act(async () => {
      fireEvent.click(columnRadio);
    });

    expect(columnRadio.checked).toBeTruthy();
    expect(getByTestId('validateform-button')).not.toHaveClass(
      'cursor-not-allowed'
    );
  });
});
