import { fireEvent, render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import * as pageCartoService from 'services/page-carto';
import { mockPageCartoData } from 'utils/mocks/data';
import { PageCartoPanels } from '../PageCartoPanels';

describe('PageCartoPanels', () => {
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

  it('renders the tabs and their content', async () => {
    const queryClient = new QueryClient();
    const { getAllByRole, getByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <PageCartoPanels />
      </QueryClientProvider>
    );
    const tabs = getAllByRole('tab');
    expect(tabs).toHaveLength(3);

    fireEvent.click(tabs[1]);
    expect(getByTestId('import-dataset')).toBeDefined();
  });
});
