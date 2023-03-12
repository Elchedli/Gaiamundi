import { render, waitFor } from '@testing-library/react';
import { PageCartoProvider } from 'hooks/usePageCarto';
import { QueryClient, QueryClientProvider } from 'react-query';
import { mockDataFragments, mockPageCartoData } from 'utils/mocks/data';
import { PageCartoDataPanel } from '../PageCartoDataPanel';

jest.mock('services/page-carto', () => {
  return {
    getPageCartoById(id: number) {
      return Promise.resolve({
        data:
          id === mockPageCartoData.id
            ? mockPageCartoData
            : {
                ...mockPageCartoData,
                data_fragments: {
                  data: [],
                  meta: { pagination: { total: 0 } },
                },
              },
      });
    },
  };
});

describe('PageCartoPanelData', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should render the component', async () => {
    const queryClient = new QueryClient();
    const { getByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <PageCartoProvider id={mockPageCartoData.id}>
          <PageCartoDataPanel />
        </PageCartoProvider>
      </QueryClientProvider>
    );
    await waitFor(() => {
      expect(getByTestId('import-dataset')).toBeInTheDocument();
    });
  });

  it('should display the data table if data is present', async () => {
    const queryClient = new QueryClient();
    const { container, getByText, getAllByRole } = render(
      <QueryClientProvider client={queryClient}>
        <PageCartoProvider id={mockPageCartoData.id}>
          <PageCartoDataPanel />
        </PageCartoProvider>
      </QueryClientProvider>
    );
    await waitFor(() => {
      const datasetName = mockDataFragments[0].dataset.name;
      const columns = mockDataFragments[0].columns;
      const columnHeaders = getAllByRole('columnheader');
      expect(columnHeaders).toHaveLength(4);
      columns
        .filter((column) => !column.isGeoCode)
        .forEach((column) => {
          const row = getByText(column.name).parentNode;
          expect(row).toHaveTextContent(datasetName);
          expect(row).toHaveTextContent(column.source);
          expect(row).toHaveTextContent(column.validity);
        });
      expect(container).toMatchSnapshot();
    });
  });

  it('should display an info alert if no data is present', async () => {
    const queryClient = new QueryClient();
    const { container, getByRole } = render(
      <QueryClientProvider client={queryClient}>
        <PageCartoProvider id={0}>
          <PageCartoDataPanel />
        </PageCartoProvider>
      </QueryClientProvider>
    );
    await waitFor(() => {
      expect(getByRole('alert')).toBeInTheDocument();
      expect(container).toMatchSnapshot();
    });
  });
});
