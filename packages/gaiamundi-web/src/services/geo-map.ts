import config from 'config';
import { ApiData, ApiErrorResponse } from 'interfaces/api';
import { UploadedFile } from 'interfaces/file';
import { GeoMapStub } from 'interfaces/geo-map';
import { ContentType, strapi } from './strapi';

export const createGeoMap = async (data: GeoMapStub) => {
  return await strapi.create<GeoMapStub>(ContentType.GEO_MAPS, data);
};

export const uploadGeoJson = async (file: File) => {
  return await strapi.uploadFile(file, 'api::geo-map.geo-map');
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

export const getConvertedCsv = async (id: number) => {
  return await strapi.request
    .get<void, any>(`${config.API_URL}/api/page-cartos/${id}/data`)
    .catch(({ error }: ApiErrorResponse) => {
      throw error;
    });
};
