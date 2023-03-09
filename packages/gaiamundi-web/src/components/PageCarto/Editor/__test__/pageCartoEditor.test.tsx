import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { mockPageCartoData } from 'utils/mocks/data';
import { PageCartoEditor } from '../PageCartoEditor';

describe('pageCartoEditor', () => {
  it('renders the correct children components', async () => {
    const queryClient = new QueryClient();
    const { getByTestId, container } = render(
      <QueryClientProvider client={queryClient}>
        <PageCartoEditor pageCarto={mockPageCartoData} />
      </QueryClientProvider>
    );
    expect(container).toMatchSnapshot();
    const pageMap = getByTestId('loading-message');
    expect(pageMap).toBeInTheDocument();
    const pagePanels = getByTestId('pagecarto-panels');
    expect(pagePanels).toBeInTheDocument();
  });
});
