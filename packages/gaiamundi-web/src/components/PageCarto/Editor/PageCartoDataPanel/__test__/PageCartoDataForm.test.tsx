import { fireEvent, render, waitFor } from '@testing-library/react';
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

  it('renders the correct text elements', () => {
    const mockDataForm = jest.fn();
    const queryClient = new QueryClient();

    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <Router>
          <PageCartoDataForm pageCartoId={0} onSubmit={mockDataForm} />
        </Router>
      </QueryClientProvider>
    );

    expect(
      getByText("1. Uploader des données à partir d'un fichier CSV")
    ).toBeInTheDocument();
    expect(getByText('Nom du jeu de données')).toBeInTheDocument();
    expect(
      getByText('Attention: Risque de non conformité')
    ).toBeInTheDocument();
    expect(getByText('Valider')).toBeInTheDocument();
    // expect(container).toMatchSnapshot();
  });

  it('checks input control behaviour', async () => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
    const file = new File(
      ['testcolumn1,testcolumn2,testcolumn3\nrow1,row2,row3'],
      'file.csv',
      { type: 'text/csv' }
    );

    const mockDataForm = jest.fn();
    const queryClient = new QueryClient();
    const { getByText, getByTestId, container } = render(
      <QueryClientProvider client={queryClient}>
        <Router>
          <PageCartoDataForm pageCartoId={0} onSubmit={mockDataForm} />
        </Router>
      </QueryClientProvider>
    );

    const allFormInputs = container.querySelectorAll('input');
    const fileInput = allFormInputs[0] as HTMLInputElement;
    // const searchTextInput = allFormInputs[1] as HTMLInputElement;
    // const checkboxInput = allFormInputs[2] as HTMLElement;
    //check if it has value
    // const nameDataTextInput = allFormInputs[3] as HTMLInputElement;

    // const originFileTextInput = allFormInputs[4] as HTMLInputElement;
    const originFileTextInput = getByTestId('origin-input') as HTMLInputElement;
    // cursor-not-allowed
    //csvUploader code needed to fill the form
    userEvent.type(originFileTextInput, 'test text');
    expect(originFileTextInput.value).toBe('test text');

    userEvent.upload(fileInput, file);

    await waitFor(() => {
      expect(getByText('testcolumn1')).toBeInTheDocument();
    });
    const nameDataTextInput = container.querySelector(
      '#fragmentName'
    ) as HTMLInputElement;
    expect(nameDataTextInput.value).toEqual(mockFileUpload.name);

    // const nameDataTextInput = container.querySelector(  // const nameDataTextInput = container.querySelector(  // const nameDataTextInput = container.querySelector(  // const nameDataTextInput = container.querySelector(
    //   '#fragmentName'
    // ) as HTMLInputElement;
    // await waitFor(() => {
    //   expect(
    //     (container.querySelector('#fragmentName') as HTMLInputElement).value
    //   ).toBe('file.csv');
    // });
    //   '#fragmentName'
    // ) as HTMLInputElement;
    // await waitFor(() => {
    //   expect(
    //     (container.querySelector('#fragmentName') as HTMLInputElement).value
    //   ).toBe('file.csv');
    // });
    //   '#fragmentName'
    // ) as HTMLInputElement;
    // await waitFor(() => {
    //   expect(
    //     (container.querySelector('#fragmentName') as HTMLInputElement).value
    //   ).toBe('file.csv');
    // });  // const nameDataTextInput = container.querySelector(
    //   '#fragmentName'
    // ) as HTMLInputElement;
    // await waitFor(() => {
    //   expect(
    //     (container.querySelector('#fragmentName') as HTMLInputElement).value
    //   ).toBe('file.csv');
    // });
    //   '#fragmentName'
    // ) as HTMLInputElement;
    // await waitFor(() => {
    //   expect(
    //     (container.querySelector('#fragmentName') as HTMLInputElement).value
    //   ).toBe('file.csv');
    // });

    // console.log(nameDataTextInput);
    expect(container).toMatchSnapshot();
    // expect(nameDataTextInput).tochange

    // expect(nameDataTextInput.value)

    // userEvent.type(nameDataTextInput, 'file.csv');

    const dataGridRow = container.querySelectorAll(
      "div[role='grid']:nth-child(2) > div"
    )[1];

    const columnCheckbox = dataGridRow.querySelector('input[type=checkbox]');

    expect(columnCheckbox).not.toBeNull();

    fireEvent.click(columnCheckbox as Element);

    const columnRadio = dataGridRow.querySelector('input[type=radio]');

    expect(columnRadio).not.toBeNull();

    fireEvent.click(columnRadio as Element);
    expect(getByTestId('validateform-button')).toHaveClass(
      'cursor-not-allowed'
    );
  });
});
