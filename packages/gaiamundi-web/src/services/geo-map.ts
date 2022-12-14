import { ApiCollectionContentType } from 'interfaces/api';
import { GeoMapAttributes } from '../interfaces/map';
import { strapi } from './init';

export const getMap = async (
  query?: object | number
): Promise<ApiCollectionContentType<GeoMapAttributes>> => {
  return await strapi.get('geo-maps', query);
};

export const createMap = async (data: GeoMapAttributes) => {
  return await strapi.create('geo-maps', data);
};

export const updateMap = async (
  id: number,
  data: Partial<GeoMapAttributes>
) => {
  return await strapi.update('geo-maps', id, data);
};

export const deleteMap = async (id: number) => {
  return await strapi.delete('geo-maps', id);
};
