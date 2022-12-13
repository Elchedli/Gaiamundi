import { ApiCollectionContentType } from 'interfaces/api';
import { PageCartoAttributes } from '../interfaces/pageCarto';
import { strapi } from './init';

export const getPageCarto = async (
  query?: object | number
): Promise<ApiCollectionContentType<PageCartoAttributes>> => {
  return await strapi.get('page-cartos', query);
};

export const createPageCarto = async (data: PageCartoAttributes) => {
  return await strapi.create('page-cartos', data);
};

export const updatePageCarto = async (
  id: number,
  data: Partial<PageCartoAttributes>
) => {
  return await strapi.update('page-cartos', id, data);
};

export const deletePageCarto = async (id: number) => {
  return await strapi.delete('page-cartos', id);
};
