import { Map } from '../interfaces/map';
import { strapi } from './init';

export const getMap = async (query?: object | number) => {
  return await strapi.get('maps', query);
};

export const createMap = async (data: Map) => {
  return await strapi.create('maps', data);
};

export const updateMap = async (id: number, data: Partial<Map>) => {
  return await strapi.update('maps', id, data);
};

export const deleteMap = async (id: number) => {
  return await strapi.delete('maps', id);
};
