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
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            onSubmit={function (): void {}}
          />
        </PageCartoProvider>
      </QueryClientProvider>
    );
    await waitFor(() => {
      expect(getByTestId('indicator-form')).toBeInTheDocument();
    });
  });

  it('should function properly', async () => {
    const queryClient = new QueryClient();
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    window.HTMLElement.prototype.scrollIntoView = function () {};
    const onSubmit = jest.fn();

    const { getByTestId, getAllByRole } = render(
      <QueryClientProvider client={queryClient}>
        <PageCartoProvider id={mockPageCartoData.id}>
          <PageCartoIndicatorForm
            pageCartoId={mockPageCartoData.id}
            columns={mockDataFragments[0].columns.map((column) => {
              return { ...column, dataset: 'mockDataset' } as DatasetColumn;
            })}
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            onSubmit={onSubmit}
          />
        </PageCartoProvider>
      </QueryClientProvider>
    );
    await waitFor(async () => {
      expect(getByTestId('indicator-form')).toBeInTheDocument();
      const nameInput = getByTestId('name-input');
      const descriptionInput = getByTestId('description-input');
      const equationInput = getByTestId('equation-input');
      const sourceInput = getByTestId('source-input');
      const validityInput = getByTestId('validity-input');
      const submitButton = getByTestId('submit-button');
      const checkboxes = getAllByRole('checkbox');
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
      fireEvent.change(validityInput, {
        target: { value: '2' },
      });

      expect(checkboxes[0]).toBeChecked();
      expect(nameInput).toHaveValue('mockIndicator');
      expect(descriptionInput).toHaveValue('this is a mock indicator');
      expect(equationInput).toHaveValue('A+2');
      expect(sourceInput).toHaveValue('france-geojson');
      expect(validityInput).toHaveValue('2');
      await waitFor(() => {
        act(() => {
          fireEvent.click(submitButton);
        });
        expect(onSubmit).toHaveBeenCalled();
      });
    });
  });
});
