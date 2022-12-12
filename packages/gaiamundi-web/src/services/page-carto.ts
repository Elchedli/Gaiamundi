import { ApiResponse } from 'interfaces/api';
import { PageCarto } from '../interfaces/pageCarto';
import { strapi } from './init';

export const getPageCarto = async (
  query?: object | number
): Promise<
  ApiResponse<{ data: { id: number; attributes: PageCarto }[]; meta: object }>
> => {
  return await strapi.get('page-cartos', query);
};

export const createPageCarto = async (data: PageCarto) => {
  return await strapi.create('page-cartos', data);
};

export const updatePageCarto = async (id: number, data: Partial<PageCarto>) => {
  return await strapi.update('page-cartos', id, data);
};

export const deletePageCarto = async (id: number) => {
  return await strapi.delete('page-cartos', id);
};
