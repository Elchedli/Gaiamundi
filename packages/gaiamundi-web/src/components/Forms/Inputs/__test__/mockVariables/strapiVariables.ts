import { ApiCollection, ApiDocument } from 'interfaces/api';
import { DataFragment } from 'interfaces/data-fragment';
import { Dataset } from 'interfaces/dataset';
import { UploadedFile } from 'interfaces/file';
import { GeoMap } from 'interfaces/geo-map';
import { Tag } from 'interfaces/page-carto';
import { User } from 'interfaces/user';

export const mockOwnerApiDocument: ApiDocument<User> = {
  data: {
    id: 1,
    attributes: {
      id: 1,
      username: 'testuser',
      password: 'test',
      email: 'test@test.com',
      provider: 'local',
      confirmed: true,
      blocked: false,
      createdAt: '2022-02-07T00:00:00.000Z',
      updatedAt: '2022-02-07T00:00:00.000Z',
      created_at: '2022-02-07T00:00:00.000Z',
      updated_at: '2022-02-07T00:00:00.000Z',
    },
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
        name: 'FirstDataSet',
        columns: [],
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
