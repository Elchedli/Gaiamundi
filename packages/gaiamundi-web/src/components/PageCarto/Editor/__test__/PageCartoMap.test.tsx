import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PageCartoProvider } from 'hooks/usePageCarto';
import { QueryClient, QueryClientProvider } from 'react-query';
import {
  mockChosenIndicator,
  mockMapPath,
  mockMergedCsvData,
  mockPageCartoData,
} from 'utils/mocks/data';
import { PageCartoMap } from '../PageCartoMap';

// ResizeObserver is not defined used by eazychart
class ResizeObserver {
  observe() {
    /* noop */
  }
  unobserve() {
    /* noop */
  }
  disconnect() {
    /* noop */
  }
}

// Mock useAuth hook to return a fake user object
jest.mock('hooks/useAuth', () => {
  return {
    useAuth() {
      return {
        isAuthenticated: true,
        user: { id: 1 },
      };
    },
  };
});

// Mock the usePageCarto hook to return a fake response object
jest.mock('services/page-carto', () => {
  return {
    getPageCartoById() {
      return Promise.resolve({
        data: mockPageCartoData,
      });
    },
  };
});

jest.mock('services/geo-map', () => {
  return {
    getConvertedCsv() {
      return Promise.resolve(mockMergedCsvData);
    },
    getGeoJson() {
      return Promise.resolve(mockMapPath);
    },
  };
});

// Unable to find the geo domain key in the feature properties
describe('PageCartoMap', () => {
  window.ResizeObserver = ResizeObserver;

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('renders loading message while data is being fetched', async () => {
    const queryClient = new QueryClient();
    const { getByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <PageCartoProvider id={mockPageCartoData.id}>
          <PageCartoMap />
        </PageCartoProvider>
      </QueryClientProvider>
    );
    await waitFor(() => {
      expect(getByTestId('loading-message')).toBeInTheDocument();
    });
  });

  it('renders map once geojson data is fetched', async () => {
    const queryClient = new QueryClient();
    const { getByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <PageCartoProvider id={mockPageCartoData.id}>
          <PageCartoMap />
        </PageCartoProvider>
      </QueryClientProvider>
    );

    await waitFor(() => {
      const map = getByTestId('map-chart');
      expect(map).toBeInTheDocument();
    });
  });

  it('shows data equation correctly in the map', async () => {
    // jest.mock('hooks/usePageCarto');
    // (usePageCarto as jest.Mock).mockImplementation(() => ({
    //   indicators: indicatorsMockData,
    //   chosenIndicator: mockChosenIndicator,
    // }));

    jest.mock('hooks/usePageCarto', () => {
      return {
        usePageCarto() {
          return {
            chosenIndicator: mockChosenIndicator,
          };
        },
      };
    });
    const queryClient = new QueryClient();
    const { getByTestId, container } = render(
      <QueryClientProvider client={queryClient}>
        <PageCartoProvider id={mockPageCartoData.id}>
          <PageCartoMap />
        </PageCartoProvider>
      </QueryClientProvider>
    );

    await waitFor(() => {
      const map = getByTestId('map-chart');
      expect(map).toBeInTheDocument();
      const pathOfMap = document.querySelector('g > path') as SVGSVGElement;
      userEvent.hover(pathOfMap);
    });
    expect(container).toMatchSnapshot();
    // const htext = document.querySelectorAll('ez-tooltip-text');
    // (
    //   htext[0].querySelector(
    //     'div[class=ez-tooltip-attribute--value]'
    //   ) as HTMLElement
    // ).innerText == ;

    // const tab : string[] = [];
    // htext.forEach((element) => {
    //   const mapCodeOrValue = element.querySelector(
    //     'div[class=ez-tooltip-attribute--value]'
    //   ) as HTMLElement;
    //   expect(mapCodeOrValue).toBe(tab[index]);
    // });
    // htext[1].querySelector('div[class=ez-tooltip-attribute--value]')
    //   .innerText == myequationValue;
  });
});
