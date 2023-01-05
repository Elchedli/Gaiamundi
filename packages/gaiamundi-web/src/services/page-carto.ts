import { PageCarto, PageCartoStub } from 'interfaces/page-carto';
import { ContentType, strapi } from './strapi';

export const createPageCarto = async (data: PageCartoStub) => {
  return await strapi.create<PageCartoStub>(ContentType.PAGE_CARTOS, data);
};

export const getLatestPageCartos = async (page: number, pageSize: number) => {
  return await strapi.get<PageCarto>(ContentType.PAGE_CARTOS, {
    populate: '*',
    sort: 'createdAt:desc',
    pagination: {
      page,
      pageSize,
    },
  });
};

export const getPageCartoById = async (id: number) => {
  return await strapi.getById<PageCarto>(ContentType.PAGE_CARTOS, id, {
    populate: {
      map: {
        populate: {
          geoJSON: true,
        },
      },
      owner: true,
      columns: {
        populate: {
          dataset: true,
        },
      },
    },
  });
};

export const uploadCsv = async (file: File) => {
  return await strapi.uploadFile(file, 'api::page-carto.page-carto');
};
