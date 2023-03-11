import { render } from '@testing-library/react';
import { usePageCarto } from 'hooks/usePageCarto';
import { QueryClient, QueryClientProvider } from 'react-query';
import { PageCartoEditor } from '../PageCartoEditor';

jest.mock('hooks/usePageCarto');

describe('pageCartoEditor', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('renders the correct children components', async () => {
    (usePageCarto as jest.Mock).mockReturnValue({
      isLoading: true,
      isError: false,
      error: undefined,
      data: undefined,
    });
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
