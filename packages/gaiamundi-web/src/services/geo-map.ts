import { GeoMapStub } from 'interfaces/geo-map';
import { ContentType, strapi } from './strapi';

export const createGeoMap = async (data: GeoMapStub) => {
  return await strapi.create<GeoMapStub>(ContentType.GEO_MAPS, data);
};

export const uploadGeoJson = async (file: File) => {
  return await strapi.uploadFile(file, 'api::geo-map.geo-map');
};
