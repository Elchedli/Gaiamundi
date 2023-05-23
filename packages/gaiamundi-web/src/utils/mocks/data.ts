import { ApiCollection, ApiData } from 'interfaces/api';
import { DataFragment } from 'interfaces/data-fragment';
import { Dataset } from 'interfaces/dataset';
import { UploadedFile } from 'interfaces/file';
import { GeoMap } from 'interfaces/geo-map';
import { Indicator } from 'interfaces/indicator';
import { PageCarto } from 'interfaces/page-carto';
import { Tag } from 'interfaces/tag';
import { User } from 'interfaces/user';
import mockMapJson from './map.json';

export const mockMapPath = mockMapJson;

export const mockFileUpload = {
  id: 184,
  name: 'exampleParsing2.csv',
  alternativeText: null,
  caption: null,
  width: null,
  height: null,
  formats: null,
  hash: 'example_Parsing2_ce8756a044',
  ext: '.csv',
  mime: 'text/csv',
  size: 0.05,
  url: '/uploads/example_Parsing2_ce8756a044.csv',
  previewUrl: null,
  provider: 'local',
  provider_metadata: null,
  createdAt: '2023-03-16T18:20:09.476Z',
  updatedAt: '2023-03-16T18:20:09.476Z',
};

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

export const mockGeoJson: ApiData<UploadedFile> = {
  id: 1,
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
};

export const mockCover: ApiData<UploadedFile> = {
  id: 3,
  name: 'image.png',
  hash: 'hashImage',
  provider: 'provider123',
  ext: '.png',
  mime: 'application/image',
  size: 1234,
  url: '/api/v1/geo-maps/id/thumbnailImage',
  formats: {
    small: {
      extension: 'ext',
      url: '/api/v1/geo-maps/id/thumbnailImage?720',
      size: 360,
      hash: 'hash720',
      mime: 'mimeExample',
    },
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
};

export const mockGeoMap: ApiData<GeoMap> = {
  id: 1,
  name: 'Test Map',
  yearValidity: 2022,
  mesh: 'Test Maille',
  source: 'Test Source',
  license: 'Test License',
  properties: [
    {
      name: 'code',
      sample: '39',
      isGeoCode: true,
    },
    {
      name: 'nom',
      sample: 'Jura',
      isGeoCode: false,
    },
  ],
  owner: mockUser,
  geoJSON: mockGeoJson,
  created_at: '2022-02-07T00:00:00.000Z',
  updated_at: '2022-02-07T00:00:00.000Z',
};

export const mockTags: ApiData<Tag>[] = [
  {
    id: 1,
    name: 'Tag A',
    count: 5,
    created_at: '2022-02-07T00:00:00.000Z',
    updated_at: '2022-02-07T00:00:00.000Z',
  },
  {
    id: 2,
    name: 'Tag B',
    count: 3,
    created_at: '2022-02-07T00:00:00.000Z',
    updated_at: '2022-02-07T00:00:00.000Z',
  },
  {
    id: 3,
    name: 'Tag C',
    count: 2,
    created_at: '2022-02-07T00:00:00.000Z',
    updated_at: '2022-02-07T00:00:00.000Z',
  },
];

export const mockDataset: ApiData<Dataset> = {
  id: 122,
  name: 'firstDataset',
  origin: 3,
  isPublic: true,
  owner: mockUser,
  csv: {
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
  created_at: '2022-02-07T00:00:00.000Z',
  updated_at: '2022-02-07T00:00:00.000Z',
};

export const mockDataFragments: ApiData<DataFragment>[] = [
  {
    id: 1,
    name: 'FirstFragment',
    columns: [
      {
        name: 'firstColumn',
        sample: 5,
        source: 'source1',
        validity: '2021',
        isGeoCode: true,
      },
      {
        name: 'secondColumn',
        sample: 10.3,
        source: 'source2',
        validity: '2022',
        isGeoCode: false,
      },
      {
        name: 'thirdColumn',
        sample: 0.25,
        source: 'source3',
        validity: '2023',
        isGeoCode: false,
      },
      {
        name: 'fourthColumn',
        sample: 1000,
        source: 'source4',
        validity: '2024',
        isGeoCode: false,
      },
    ],
    dataset: mockDataset,
    created_at: '2022-02-07T00:00:00.000Z',
    updated_at: '2022-02-07T00:00:00.000Z',
  },
];

export const indicatorsMockData: ApiData<Indicator>[] = [
  {
    id: 4,
    name: 'mockIndicator1',
    description: 'This is a mock indicator',
    source: 'mock',
    validity: 2,
    created_at: '2023-03-14T10:06:41.979Z',
    updated_at: '2023-03-14T10:06:41.979Z',
    equation: 'A+2',
    variables: [],
  },
  {
    id: 5,
    name: 'mockIndicator2',
    description: 'This is a mock indicator',
    source: 'mock',
    validity: 4,
    variables: [],
    created_at: '2023-03-14T10:12:37.285Z',
    updated_at: '2023-03-14T10:12:37.285Z',
    equation: 'A*2',
  },
];

export const mockPageCartoData: ApiData<PageCarto> = {
  id: 1,
  name: 'Page Carto 1',
  owner: mockUser,
  tags: mockTags,
  map: mockGeoMap,
  cover: mockCover,
  indicators: indicatorsMockData,
  charts: [],
  html: '<p>Test HTML</p>',
  data_fragments: mockDataFragments,
  created_at: '2022-02-07T00:00:00.000Z',
  updated_at: '2022-02-07T00:00:00.000Z',
};

export const mockGeoMapData: ApiData<GeoMap> = {
  id: 1,
  name: 'Test Map',
  yearValidity: 2022,
  mesh: 'Test Maille',
  source: 'Test Source',
  license: 'Test License',
  properties: [
    {
      name: 'nom',
      sample: 'Taponas',
      isGeoCode: true,
    },
  ],
  owner: mockUser,
  geoJSON: {
    id: 1,
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
  created_at: '2022-02-07T00:00:00.000Z',
  updated_at: '2022-02-07T00:00:00.000Z',
};

export const mockGeoMapApiCollection: ApiCollection<GeoMap> = {
  data: Array.from({ length: 3 }, (_, index) => ({
    ...mockGeoMapData,
    id: index + 1,
    name: `Test Map ${index + 1}`,
  })),
  meta: {
    pagination: {
      pageCount: 1,
      total: 3,
    },
  },
};
