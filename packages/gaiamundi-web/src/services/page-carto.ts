import { PageCarto, PageCartoBase, PageCartoStub } from 'interfaces/page-carto';
import { User } from 'interfaces/user';
import { ContentType, QueryParams, strapi } from './strapi';

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
      indicators: {
        populate: {
          variables: true,
        },
      },
      charts: true,
    },
  });
};

export const uploadCsv = async (file: File) => {
  return await strapi.uploadFile(file, 'api::page-carto.page-carto');
};

export const getPageCartoByTagsAndSearch = async (
  page: number,
  searchKeywords: string,
  selectedTags: number[],
  searchKeywordsCondition: any,
  user: User | undefined
) => {
  const filters: any = {
    owner: {
      id: {
        $eq: user?.id || undefined,
      },
    },
  };
  if (searchKeywords) {
    filters['$or'] = [
      {
        map: {
          $or: [
            {
              name: searchKeywordsCondition,
            },
            {
              yearValidity: searchKeywordsCondition,
            },
            {
              mesh: searchKeywordsCondition,
            },
          ],
        },
      },
      {
        name: searchKeywordsCondition,
      },
      {
        html: searchKeywordsCondition,
      },
    ];
  }
  if (selectedTags.length > 0) {
    filters.tags = {
      id:
        selectedTags.length != 0
          ? {
              $in: selectedTags,
            }
          : {},
    };
  }
  return await strapi.get<PageCarto>(ContentType.PAGE_CARTOS, {
    filters: filters as QueryParams['filters'],
    populate: '*',
    sort: 'createdAt:desc',
    pagination: {
      page,
      pageSize: 9,
    },
  });
};

export const updatePageCarto = async (
  id: number,
  data: Partial<PageCartoBase>
) => {
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
export const deletePageCarto = async (id: number) => {
  return await strapi.delete(ContentType.PAGE_CARTOS, id);
};
