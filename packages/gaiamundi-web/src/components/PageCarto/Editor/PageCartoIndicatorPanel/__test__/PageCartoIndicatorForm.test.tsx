import { act, fireEvent, render, waitFor } from '@testing-library/react';
import { PageCartoProvider } from 'hooks/usePageCarto';
import { DatasetColumn } from 'interfaces/column';
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
  beforeAll(() => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
  });

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
            onSubmit={jest.fn()}
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
    const queryClient = new QueryClient();
    const mockSubmit = jest.fn();
    const { getByTestId, getAllByRole } = render(
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

    await waitFor(() => {
      expect(getByTestId('indicator-form')).toBeInTheDocument();
    });

    const nameInput = getByTestId('name-input');
    fireEvent.change(nameInput, { target: { value: 'mockIndicator' } });
    expect(nameInput).toHaveValue('mockIndicator');

    const descriptionInput = getByTestId('description-input');
    fireEvent.change(descriptionInput, {
      target: { value: 'this is a mock indicator' },
    });
    expect(descriptionInput).toHaveValue('this is a mock indicator');

    await waitFor(() => {
      expect(getByTestId('equation-input')).toBeInTheDocument();
    });

    const equationInput = getByTestId('equation-input');
    fireEvent.change(equationInput, {
      target: { value: 'A+2' },
    });
    expect(equationInput).toHaveValue('A+2');

    const sourceInput = getByTestId('source-input');
    fireEvent.change(sourceInput, {
      target: { value: 'france-geojson' },
    });
    expect(sourceInput).toHaveValue('france-geojson');

    const validityInput = getByTestId('validity-input');
    expect(validityInput).toBeInTheDocument();
    fireEvent.change(validityInput, {
      target: { value: '2023' },
    });
    expect(validityInput).toHaveValue('2023');

    act(() => {
      const checkboxes = getAllByRole('checkbox');
      fireEvent.click(checkboxes[0]);
    });

    await waitFor(() => {
      const submitButton = getByTestId('submit-button');
      expect(submitButton).not.toHaveAttribute('disabled');
      fireEvent.click(submitButton);
      expect(mockSubmit).toHaveBeenCalled();
    });
  });
});
