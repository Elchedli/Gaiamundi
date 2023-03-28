import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { PageCartoProvider } from 'hooks/usePageCarto';
import { DatasetColumn } from 'interfaces/column';
import { act } from 'react-dom/test-utils';
import { QueryClient, QueryClientProvider } from 'react-query';
import { mockDataFragments, mockPageCartoData } from 'utils/mocks/data';
import { PageCartoIndicatorForm } from '../PageCartoIndicatorForm';

jest.mock('services/page-carto', () => {
  return {
    getPageCartoById(id: number) {
      return Promise.resolve({
        data:
          id === mockPageCartoData.id
            ? mockPageCartoData
            : {
                ...mockPageCartoData,
              },
      });
    },
  };
});

jest.mock('services/equation', () => {
  return {
    getEquations() {
      return Promise.resolve({
        data: [],
      });
    },
  };
});

jest.mock('services/indicator', () => {
  return {
    addIndicatorToPageCarto() {
      return Promise.resolve({
        data: [],
      });
    },
  };
});

describe('Indicator form tests', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should render the indicator form', async () => {
    const queryClient = new QueryClient();
    const { getByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <PageCartoProvider id={mockPageCartoData.id}>
          <PageCartoIndicatorForm
            pageCartoId={mockPageCartoData.id}
            columns={mockDataFragments[0].columns.map((column) => {
              return { ...column, dataset: 'mockDataset' } as DatasetColumn;
            })}
            onSubmit={function (): void {
              null;
            }}
          />
        </PageCartoProvider>
      </QueryClientProvider>
    );
    await waitFor(() => {
      expect(getByTestId('indicator-form')).toBeInTheDocument();
    });
  });
  // Fill out the form fields and check if the submit was called
  it('should function properly', async () => {
    jest.useFakeTimers();
    const queryClient = new QueryClient();
    window.HTMLElement.prototype.scrollIntoView = function () {
      null;
    };

    const mockSubmit = jest.fn();
    const Component = () =>
      render(
        <QueryClientProvider client={queryClient}>
          <PageCartoProvider id={mockPageCartoData.id}>
            <PageCartoIndicatorForm
              pageCartoId={mockPageCartoData.id}
              columns={mockDataFragments[0].columns.map((column) => {
                return { ...column, dataset: 'mockDataset' } as DatasetColumn;
              })}
              onSubmit={mockSubmit}
            />
          </PageCartoProvider>
        </QueryClientProvider>
      );

    jest.spyOn(console, 'error').mockImplementation(() => undefined);

    await act(async () => {
      Component();
    });

    const nameInput = screen.getByTestId('name-input');
    const descriptionInput = screen.getByTestId('description-input');
    const equationInput = screen.getByTestId('equation-input');
    const sourceInput = screen.getByTestId('source-input');
    const submitButton = screen.getByTestId('submit-button');
    const checkboxes = screen.getAllByRole('checkbox');
    const validityInput = screen.getByTestId('validity-input');
    fireEvent.change(nameInput, { target: { value: 'mockIndicator' } });
    fireEvent.change(descriptionInput, {
      target: { value: 'this is a mock indicator' },
    });
    fireEvent.click(checkboxes[0]);
    fireEvent.change(equationInput, {
      target: { value: 'A+2' },
    });
    fireEvent.change(sourceInput, {
      target: { value: 'france-geojson' },
    });
    expect(screen.getByTestId('submit-button')).toBeInTheDocument();
    expect(validityInput).toBeInTheDocument();
    expect(checkboxes[0]).toBeChecked();
    expect(nameInput).toHaveValue('mockIndicator');
    expect(descriptionInput).toHaveValue('this is a mock indicator');
    expect(equationInput).toHaveValue('A+2');
    expect(sourceInput).toHaveValue('france-geojson');
    fireEvent.change(validityInput, {
      target: { value: '2' },
    });

    await waitFor(() => {
      expect(validityInput).toHaveValue('2');
      fireEvent.click(submitButton);
      expect(mockSubmit).toHaveBeenCalled();
    });

    jest.spyOn(console, 'error').mockImplementation((error) => {
      if (error.toString().includes('act(')) {
        return;
      }
      console.error(error);
    });
  });
});
