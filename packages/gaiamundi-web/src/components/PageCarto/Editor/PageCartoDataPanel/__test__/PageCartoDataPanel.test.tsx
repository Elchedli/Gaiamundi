import { fireEvent, render, waitFor } from '@testing-library/react';
import { AuthProvider } from 'hooks/useAuth';
import { ModalProvider } from 'hooks/useModal';
import { PageCartoProvider } from 'hooks/usePageCarto';
import { QueryClient, QueryClientProvider } from 'react-query';
import { MemoryRouter as Router } from 'react-router-dom';
import {
  mockDataFragments,
  mockPageCartoData,
  mockUser,
} from 'utils/mocks/data';
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
              },
      });
    },
  };
});

describe('PageCartoPanelData', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should display an info alert if no data is present', async () => {
    const queryClient = new QueryClient();
    const { getByRole } = render(
      <QueryClientProvider client={queryClient}>
        <PageCartoProvider id={0}>
          <PageCartoDataPanel />
        </PageCartoProvider>
      </QueryClientProvider>
    );
    await waitFor(() => {
      expect(getByRole('alert')).toBeInTheDocument();
    });
  });

  it('should display the data table if data is present', async () => {
    const queryClient = new QueryClient();

    const { getByText, getAllByRole } = render(
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
    });
  });

  it('should display useModal menu on click', async () => {
    const queryClient = new QueryClient();

    jest.mock('hooks/useModal', () => {
      return {
        showModal: jest.fn(),
      };
    });
    jest.mock('hooks/useAuth', () => {
      return {
        isAuthenticated: true,
        user: mockUser,
      };
    });

    const mockIntersectionObserver = jest.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null,
    });

    window.IntersectionObserver = mockIntersectionObserver;
    const { getByTestId, getAllByRole } = render(
      <QueryClientProvider client={queryClient}>
        <Router>
          <AuthProvider>
            <PageCartoProvider id={mockPageCartoData.id}>
              <ModalProvider>
                <PageCartoDataPanel />
              </ModalProvider>
            </PageCartoProvider>
          </AuthProvider>
        </Router>
      </QueryClientProvider>
    );
    await waitFor(() => {
      expect(getByTestId('import-dataset')).toBeInTheDocument();
    });
    fireEvent.click(getByTestId('import-dataset'));
    await waitFor(() => {
      expect(getAllByRole('grid')[1]).toBeInTheDocument();
    });
  });
});
