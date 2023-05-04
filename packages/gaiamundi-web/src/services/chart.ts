import { Chart } from 'interfaces/chart';
import { ContentType, strapi } from './strapi';

export const createChart = async (data: Chart) => {
  return await strapi.create<Chart>(ContentType.CHARTS, data);
};

export const getChartById = async (id: number) => {
  return await strapi.getById<Chart>(ContentType.CHARTS, id, {
    populate: {
      map: {
        populate: {
          geoJSON: true,
          properties: true,
        },
      },
      owner: true,
      data_fragments: {
        populate: {
          dataset: true,
          columns: true,
        },
      },
      indicators: true,
      page_carto: true,
    },
  });
};

export const getChartByCartoPage = async (pageCartoId: number) => {
  return await strapi.get<Chart>(ContentType.CHARTS, {
    filters: {
      page_carto: { $eq: pageCartoId },
    },
    populate: {
      map: {
        populate: {
          geoJSON: true,
          properties: true,
        },
      },
      owner: true,
      data_fragments: {
        populate: {
          dataset: true,
          columns: true,
        },
      },
      indicators: true,
      page_carto: true,
    },
  });
};

export const updateChart = async (id: number, data: Partial<Chart>) => {
  return await strapi.update(ContentType.CHARTS, id, { data });
};
export const deleteChart = async (id: number) => {
  return await strapi.delete(ContentType.CHARTS, id);
};
