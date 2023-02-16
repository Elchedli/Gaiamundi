import { render } from '@testing-library/react';
import GeoListItem from 'components/MapGeoCreate/GeoListItem';
import config from 'config';
import { ApiData } from 'interfaces/api';
import { GeoMap } from 'interfaces/geo-map';
import { User } from 'interfaces/user';
const mockUser: User = {
  id: 1,
  username: 'testuser',
  password: 'test',
  email: 'test@test.com',
  provider: 'local',
  confirmed: true,
  blocked: false,
  createdAt: '2022-02-07T00:00:00.000Z',
  updatedAt: '2022-02-07T00:00:00.000Z',
};

const mockGeoMapData: ApiData<GeoMap> = {
  id: 1,
  attributes: {
    name: 'Test Map',
    yearValidity: 2022,
    source: 'Test Source',
    license: 'Test License',
    properties: [],
    owner: {
      data: {
        id: 1,
        attributes: {
          ...mockUser,
          created_at: '2022-02-07T00:00:00.000Z',
          updated_at: '2022-02-07T00:00:00.000Z',
        },
      },
      meta: undefined,
    },
    geoJSON: {
      data: {
        id: 1,
        attributes: {
          id: 3,
          name: 'test.geojson',
          hash: 'abc123',
          provider: 'provider123',
          ext: '.geojson',
          mime: 'application/json',
          size: 1234,
          url: 'https://example.com/api/v1/geo-maps/id/thumbnail',
          formats: {
            '720': {
              extension: 'ext',
              url: 'happyUrl',
              size: 360,
              hash: 'hashbar',
              mime: 'mimeExample',
            },
          },
          created_at: '2022-02-07T00:00:00.000Z',
          updated_at: '2022-02-07T00:00:00.000Z',
        },
      },
    },
    created_at: '2022-02-07T00:00:00.000Z',
    updated_at: '2022-02-07T00:00:00.000Z',
  },
};

describe('GeoListItem', () => {
  it('should render the name of the GeoMap', () => {
    const { getByText } = render(<GeoListItem {...mockGeoMapData} />);
    expect(getByText(mockGeoMapData.attributes.name)).toBeInTheDocument();
  });

  it('should render the source of the GeoMap', () => {
    const { getByText } = render(<GeoListItem {...mockGeoMapData} />);
    expect(
      getByText(`Source : ${mockGeoMapData.attributes.source}`)
    ).toBeInTheDocument();
  });

  it('should render the license of the GeoMap', () => {
    const { getByText } = render(<GeoListItem {...mockGeoMapData} />);
    expect(
      getByText(`License : ${mockGeoMapData.attributes.license}`)
    ).toBeInTheDocument();
  });

  it('should render the year validity of the GeoMap', () => {
    const { getByText } = render(<GeoListItem {...mockGeoMapData} />);
    expect(
      getByText(
        `Annee de validitée : ${mockGeoMapData.attributes.yearValidity}`
      )
    ).toBeInTheDocument();
  });

  it('should render an image with the correct src', () => {
    const { getByRole } = render(<GeoListItem {...mockGeoMapData} />);
    const imgElement = getByRole('img');
    expect(imgElement).toHaveAttribute(
      'src',
      `${config.API_URL}/api/geo-maps/thumbnail/1`
    );
  });
});
