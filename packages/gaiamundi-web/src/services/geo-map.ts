import { ApiResponse } from 'interfaces/api';
import { GeoMap } from '../interfaces/map';
import { strapi } from './init';

export const getMap = async (
  query?: object | number
): Promise<
  ApiResponse<{ data: { id: number; attributes: GeoMap }[]; meta: object }>
> => {
  return await strapi.get('geo-maps', query);
};

export const createMap = async (data: GeoMap) => {
  return await strapi.create('geo-maps', data);
};

export const updateMap = async (id: number, data: Partial<GeoMap>) => {
  return await strapi.update('geo-maps', id, data);
};

export const deleteMap = async (id: number) => {
  return await strapi.delete('geo-maps', id);
};
