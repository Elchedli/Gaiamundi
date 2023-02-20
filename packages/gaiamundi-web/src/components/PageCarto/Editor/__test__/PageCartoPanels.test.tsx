import { fireEvent, render } from '@testing-library/react';
import { ApiData } from 'interfaces/api';
import { PageCarto } from 'interfaces/page-carto';
import {
  mockCoverApiDocument,
  mockDataFragmentsApiCollection,
  mockGeoMapApiDocument,
  mockOwnerApiDocument,
  mockTagsApiCollection,
} from 'utils/mocks/data';
import { PageCartoPanels } from '../PageCartoPanels';
describe('PageCartoPanels', () => {
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

  it('renders the tabs and their content', async () => {
    const { getByText, container } = render(
      <PageCartoPanels pageCarto={mockPageCartoData} />
    );

    const tab1 = getByText('Hypertexte');
    expect(tab1).toBeInTheDocument();

    const tab2 = getByText('Données');
    expect(tab2).toBeInTheDocument();

    const tab3 = getByText('Indicateurs');
    expect(tab3).toBeInTheDocument();

    fireEvent.click(tab2);

    expect(getByText('secondColumn')).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });
});
