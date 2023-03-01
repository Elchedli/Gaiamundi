import { ApiCollection, ApiData, ApiDocument } from 'interfaces/api';
import { DataFragment } from 'interfaces/data-fragment';
import { Dataset } from 'interfaces/dataset';
import { UploadedFile } from 'interfaces/file';
import { GeoMap } from 'interfaces/geo-map';
import { PageCarto, Tag } from 'interfaces/page-carto';
import { User } from 'interfaces/user';

export const mockUser: User = {
  id: 1,
  username: 'testuser',
  password: 'test',
  email: 'test@test.com',
  provider: 'local',
  confirmed: true,
  blocked: false,
  created_at: '2022-02-07T00:00:00.000Z',
  updated_at: '2022-02-07T00:00:00.000Z',
};

export const mockOwnerApiDocument: ApiDocument<User> = {
  data: {
    id: 1,
    attributes: mockUser,
  },
  meta: undefined,
};

export const mockGeoJsonApiDocument: ApiDocument<UploadedFile> = {
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
      url: '/api/v1/geo-maps/id/thumbnail',
      formats: {
        thumbnail: {
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
};

export const mockCoverApiDocument: ApiDocument<UploadedFile> = {
  data: {
    id: 3,
    attributes: {
      id: 3,
      name: 'image.png',
      hash: 'hashImage',
      provider: 'provider123',
      ext: '.png',
      mime: 'application/image',
      size: 1234,
      url: '/api/v1/geo-maps/id/thumbnailImage',
      formats: {
        thumbnail: {
          extension: 'ext',
          url: '/api/v1/geo-maps/id/thumbnailImage?720',
          size: 360,
          hash: 'hash720',
          mime: 'mimeExample',
        },
      },
      created_at: '2022-02-07T00:00:00.000Z',
      updated_at: '2022-02-07T00:00:00.000Z',
    },
  },
};

export const mockGeoMapApiDocument: ApiDocument<GeoMap> = {
  data: {
    id: 1,
    attributes: {
      name: 'Test Map',
      yearValidity: 2022,
      source: 'Test Source',
      license: 'Test License',
      properties: [],
      owner: mockOwnerApiDocument,
      geoJSON: mockGeoJsonApiDocument,
      created_at: '2022-02-07T00:00:00.000Z',
      updated_at: '2022-02-07T00:00:00.000Z',
    },
  },
};

export const mockTagsApiCollection: ApiCollection<Tag> = {
  data: [
    {
      id: 1,
      attributes: {
        id: 1,
        name: 'tag1',
        type: 'Geographique',
        created_at: '2022-02-07T00:00:00.000Z',
        updated_at: '2022-02-07T00:00:00.000Z',
      },
    },
    {
      id: 2,
      attributes: {
        id: 2,
        name: 'tag2',
        type: 'Thématique',
        created_at: '2022-02-07T00:00:00.000Z',
        updated_at: '2022-02-07T00:00:00.000Z',
      },
    },
  ],
  meta: {
    pagination: {
      total: 10,
    },
  },
};

export const mockDatasetApiDocument: ApiDocument<Dataset> = {
  data: {
    id: 122,
    attributes: {
      name: 'hi',
      origin: 3,
      isPublic: true,
      owner: mockOwnerApiDocument,
      csv: {
        data: {
          id: 5,
          attributes: {
            id: 5,
            name: 'file.csv',
            hash: 'hashCSV',
            provider: 'provider123',
            ext: '.csv',
            mime: 'application/csv',
            size: 1234,
            url: '/api/v1/Uploads/id/csvFile.csv',
            formats: {
              thumbnail: {
                extension: 'ext',
                url: '/api/v1/Uploads/id/csvFile.csv?720',
                size: 360,
                hash: 'hash720',
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
  },
};

export const mockDataFragmentsApiCollection: ApiCollection<DataFragment> = {
  data: [
    {
      id: 1,
      attributes: {
        name: 'FirstFragment',
        columns: [
          {
            name: 'firstColumn',
            source: 'source1',
            validity: '2021',
            isGeoCode: true,
          },
          {
            name: 'secondColumn',
            source: 'source2',
            validity: '2022',
            isGeoCode: false,
          },
          {
            name: 'thirdColumn',
            source: 'source3',
            validity: '2023',
            isGeoCode: false,
          },
          {
            name: 'fourthColumn',
            source: 'source4',
            validity: '2024',
            isGeoCode: true,
          },
        ],
        dataset: mockDatasetApiDocument,
        created_at: '2022-02-07T00:00:00.000Z',
        updated_at: '2022-02-07T00:00:00.000Z',
      },
    },
  ],
  meta: {
    pagination: {
      total: 10,
    },
  },
};

export const mockPageCartoData: ApiData<PageCarto> = {
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

export const mockGeoMapData: ApiData<GeoMap> = {
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

export const mockGeoMapApiCollection: ApiCollection<GeoMap> = {
  data: Array.from({ length: 3 }, (_, index) => ({
    id: index + 1,
    attributes: {
      ...mockGeoMapData.attributes,
      name: `Test Map ${index + 1}`,
    },
  })),
  meta: {
    pagination: {
      pageCount: 1,
      total: 3,
    },
  },
};

export const tags: ApiData<Tag>[] = [
  {
    id: 1,
    attributes: {
      id: 1,
      type: 'Géographique',
      name: 'Tag A',
      count: 5,
      created_at: '2022-02-07T00:00:00.000Z',
      updated_at: '2022-02-07T00:00:00.000Z',
    },
  },
  {
    id: 2,
    attributes: {
      id: 2,
      type: 'Géographique',
      name: 'Tag B',
      count: 3,
      created_at: '2022-02-07T00:00:00.000Z',
      updated_at: '2022-02-07T00:00:00.000Z',
    },
  },
  {
    id: 3,
    attributes: {
      id: 3,
      type: 'Thématique',
      name: 'Tag C',
      count: 2,
      created_at: '2022-02-07T00:00:00.000Z',
      updated_at: '2022-02-07T00:00:00.000Z',
    },
  },
];
