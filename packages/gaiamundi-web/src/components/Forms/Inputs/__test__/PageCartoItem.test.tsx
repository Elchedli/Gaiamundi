import { render } from '@testing-library/react';
import PageCartoItem from 'components/PageCarto/PageCartoItem';
import config from 'config';
import { ApiData } from 'interfaces/api';
import { PageCarto } from 'interfaces/page-carto';
import { MemoryRouter as Router } from 'react-router-dom';
import {
  mockCoverApiDocument,
  mockDataFragmentsApiCollection,
  mockGeoMapApiDocument,
  mockOwnerApiDocument,
  mockTagsApiCollection,
} from './mockVariables/strapiVariables';

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

describe('PageCartoItem', () => {
  it('renders PageCartoItem', () => {
    const { getByText, getByRole } = render(
      <Router>
        <PageCartoItem {...mockPageCartoData} />
      </Router>
    );
    expect(getByText(mockPageCartoData.attributes.name)).toBeInTheDocument();

    expect(
      getByText(
        'Carte : ' + mockPageCartoData.attributes.map.data.attributes.name
      )
    ).toBeInTheDocument();
    expect(
      getByText(
        'Créer par : ' +
          mockPageCartoData.attributes.owner.data.attributes.username
      )
    ).toBeInTheDocument();
    mockPageCartoData.attributes.tags.data.forEach((tag) => {
      expect(getByText(tag.attributes.name)).toBeInTheDocument();
    });
    expect(getByText('Test HTML')).toBeInTheDocument();
    const imgElement = getByRole('img');
    expect(imgElement).toHaveAttribute(
      'src',
      `${config.API_URL}${mockPageCartoData.attributes.cover.data.attributes.formats.thumbnail.url}`
    );
  });
});
