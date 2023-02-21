import { render } from '@testing-library/react';
import { ApiData } from 'interfaces/api';
import { PageCarto } from 'interfaces/page-carto';
import { QueryClient, QueryClientProvider } from 'react-query';
import {
  mockCoverApiDocument,
  mockDataFragmentsApiCollection,
  mockGeoMapApiDocument,
  mockOwnerApiDocument,
  mockTagsApiCollection,
} from 'utils/mocks/data';
import { PageCartoEditor } from '../PageCartoEditor';
describe('pageCartoEditor', () => {
  const mockPageCartoData: ApiData<PageCarto> = {
    id: 1,
    attributes: {
      name: 'Page Carto 1',
      owner: mockOwnerApiDocument,
      tags: mockTagsApiCollection,
      map: mockGeoMapApiDocument,
      cover: mockCoverApiDocument,
      html: '<p>Test HTML</p>',
      data_fragments: mockDataFragmentsApiCollection,
      created_at: '2022-02-07T00:00:00.000Z',
      updated_at: '2022-02-07T00:00:00.000Z',
    },
  };

  it('renders the correct children components', async () => {
    const queryClient = new QueryClient();
    const { getByText, container } = render(
      <QueryClientProvider client={queryClient}>
        <PageCartoEditor pageCarto={mockPageCartoData} />
      </QueryClientProvider>
    );
    expect(container).toMatchSnapshot();
    const pageMap = getByText('Chargement de la carte ...');
    expect(pageMap).toBeInTheDocument();
    const pagePanel = getByText('Données');
    expect(pagePanel).toBeInTheDocument();
  });
});
