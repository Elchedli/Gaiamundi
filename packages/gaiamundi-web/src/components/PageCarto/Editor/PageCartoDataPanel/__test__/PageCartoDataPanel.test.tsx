import { render, waitFor } from '@testing-library/react';
import { PageCartoProvider } from 'hooks/usePageCarto';
import { QueryClient, QueryClientProvider } from 'react-query';
import {
  mockDataFragmentsApiCollection,
  mockPageCartoData,
} from 'utils/mocks/data';
import { PageCartoPanelData } from '../PageCartoDataPanel';

jest.mock('services/page-carto', () => {
  return {
    getPageCartoById(id: number) {
      return Promise.resolve({
        data:
          id === mockPageCartoData.id
            ? mockPageCartoData
            : {
                id: mockPageCartoData.id,
                attributes: {
                  ...mockPageCartoData.attributes,
                  data_fragments: {
                    data: [],
                    meta: { pagination: { total: 0 } },
                  },
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
          <PageCartoPanelData />
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
          <PageCartoPanelData />
        </PageCartoProvider>
      </QueryClientProvider>
    );
    await waitFor(() => {
      const datasetName =
        mockDataFragmentsApiCollection.data[0].attributes.dataset.data
          .attributes.name;
      const columns = mockDataFragmentsApiCollection.data[0].attributes.columns;
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
          <PageCartoPanelData />
        </PageCartoProvider>
      </QueryClientProvider>
    );
    await waitFor(() => {
      expect(getByRole('alert')).toBeInTheDocument();
      expect(container).toMatchSnapshot();
    });
  });
});
