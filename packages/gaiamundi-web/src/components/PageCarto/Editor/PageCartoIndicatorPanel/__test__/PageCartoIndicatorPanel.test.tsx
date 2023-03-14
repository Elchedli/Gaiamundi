import { render, waitFor } from '@testing-library/react';
import { PageCartoProvider } from 'hooks/usePageCarto';
import { QueryClient, QueryClientProvider } from 'react-query';
import { mockPageCartoData } from 'utils/mocks/data';
import { PageCartoIndicatorPanel } from '../PageCartoIndicatorPanel';

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

describe('Indicator panel tests', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should render the indicator panel', async () => {
    const queryClient = new QueryClient();
    const { getByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <PageCartoProvider id={mockPageCartoData.id}>
          <PageCartoIndicatorPanel />
        </PageCartoProvider>
      </QueryClientProvider>
    );
    await waitFor(() => {
      expect(getByTestId('create-indicator')).toBeInTheDocument();
    });
  });

  it('should contain data', async () => {
    const queryClient = new QueryClient();
    const { getByTestId, getByRole, queryByText } = render(
      <QueryClientProvider client={queryClient}>
        <PageCartoProvider id={mockPageCartoData.id}>
          <PageCartoIndicatorPanel />
        </PageCartoProvider>
      </QueryClientProvider>
    );
    await waitFor(() => {
      expect(getByTestId('create-indicator')).toBeInTheDocument();
      const grid = getByRole('grid');
      const indicator = queryByText('mockIndicator1');
      expect(grid).toBeInTheDocument();
      expect(indicator).toBeInTheDocument();
    });
  });
});
