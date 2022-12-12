import { PageCarto } from '../interfaces/pageCarto';
import { strapi } from './init';

export const getPageCarto = async (query?: object | number) => {
  return await strapi.get('page-carto', query);
};

export const createPageCarto = async (data: PageCarto) => {
  return await strapi.create('page-carto', data);
};

export const updatePageCarto = async (id: number, data: Partial<PageCarto>) => {
  return await strapi.update('page-carto', id, data);
};

export const deletePageCarto = async (id: number) => {
  return await strapi.delete('page-carto', id);
};
