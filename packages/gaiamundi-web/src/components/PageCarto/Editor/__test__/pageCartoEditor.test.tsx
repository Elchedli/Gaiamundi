import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import * as pageCartoService from 'services/page-carto';
import { mockPageCartoData } from 'utils/mocks/data';
import { PageCartoEditor } from '../PageCartoEditor';

describe('pageCartoEditor', () => {
  beforeAll(() => {
    jest.spyOn(pageCartoService, 'getPageCartoById').mockReturnValue(
      Promise.resolve({
        data: mockPageCartoData,
      })
    );
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('renders the correct children components', async () => {
    const queryClient = new QueryClient();
    const { getByTestId, container } = render(
      <QueryClientProvider client={queryClient}>
        <PageCartoEditor />
      </QueryClientProvider>
    );
    expect(container).toMatchSnapshot();
    const pageMap = getByTestId('loading-message');
    expect(pageMap).toBeInTheDocument();
    const pagePanels = getByTestId('pagecarto-panels');
    expect(pagePanels).toBeInTheDocument();
  });
});
