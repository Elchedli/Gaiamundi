import { PageCarto, PageCartoBase, PageCartoStub } from 'interfaces/page-carto';
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
    },
  });
};

export const uploadCsv = async (file: File) => {
  return await strapi.uploadFile(file, 'api::page-carto.page-carto');
};

export const updatePageCarto = async (id: number, data: PageCartoBase) => {
  return await strapi.update(ContentType.PAGE_CARTOS, id, { data });
};
export const uploadCover = async (file: File, refId: number) => {
  return await strapi.uploadFile(
    file,
    'api::page-carto.page-carto',
    `${refId}_thumbnail.png`,
    // Id of pageCartos.
    refId,
    'cover'
  );
};
