import config from 'config';
import { ApiData, ApiErrorResponse } from 'interfaces/api';
import { UploadedFile } from 'interfaces/file';
import { GeoMapStub } from 'interfaces/geo-map';
import { ContentType, strapi } from './strapi';
import { validateGeoJsonFile } from 'utils/file';

export const createGeoMap = async (data: GeoMapStub) => {
  return await strapi.create<GeoMapStub>(ContentType.GEO_MAPS, data);
};

const createGeoJson = async (file: File) => {
  if (file.type === 'application/json') {
    return file;
  }
  const GeoJsonFileContent = await validateGeoJsonFile(file);
  return new File([JSON.stringify(GeoJsonFileContent)], `${file.name}.json`, {
    type: 'application/json',
  });
};

export const uploadGeoJson = async (file: File) => {
  const fileToUpload = await createGeoJson(file);
  return await strapi.uploadFile(fileToUpload, 'api::geo-map.geo-map');
};

export const getGeoJson = async (geoJSON: ApiData<UploadedFile>) => {
  return await strapi.request
    .get<void, any>(geoJSON.url)
    .catch(({ error }: ApiErrorResponse) => {
      throw error;
    });
};

export const getGeoMapThumbnailUrlById = (id: number) => {
  return `${config.API_URL}/api/geo-maps/thumbnail/${id}`;
};
