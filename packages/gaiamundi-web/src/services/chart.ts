import { Chart } from 'interfaces/chart';
import { ContentType, QueryParams, strapi } from './strapi';

export const createChart = async (data: Chart) => {
  return await strapi.create<Chart>(ContentType.CHARTS, data);
};

export const getChartById = async (id: number) => {
  return await strapi.getById<Chart>(ContentType.CHARTS, id);
};

export const getChartsByCartoPage = async (pageCartoId: number) => {
  return await strapi.get<Chart>(ContentType.CHARTS, {
    filters: {
      page_carto: { id: { $eq: pageCartoId } },
    } as QueryParams['filters'],
  });
};

export const updateChart = async (id: number, data: Partial<Chart>) => {
  return await strapi.update(ContentType.CHARTS, id, { data });
};

export const deleteChart = async (id: number) => {
  return await strapi.delete(ContentType.CHARTS, id);
};
