import { Tag } from 'interfaces/page-carto';
import { ContentType, QueryParams, strapi } from './strapi';

export const getAllTags = async () => {
  return await strapi.get<Tag>(ContentType.TAGS, {
    populate: '*',
    sort: ['type:asc', 'createdAt:asc'],
    pagination: {
      limit: -1,
    },
  });
};

export const getAllTagsByOwner = async (ownerId: number) => {
  return await strapi.get<Tag>(ContentType.TAGS, {
    populate: {
      page_cartos: {
        populate: {
          owner: true,
        },
      },
    },
    filters: {
      page_cartos: {
        owner: {
          id: {
            $eq: ownerId,
          },
        },
      },
    } as QueryParams['filters'],
    pagination: {
      limit: -1,
    },
  });
};

export const createTag = async (data: Tag) => {
  return await strapi.create<Tag>(ContentType.TAGS, data);
};
