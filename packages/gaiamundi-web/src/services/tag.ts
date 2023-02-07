import { Tag } from 'interfaces/page-carto';
import { ContentType, strapi } from './strapi';

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
          // eslint-disable-next-line
          // @ts-ignore
          owner: {
            filters: {
              id: ownerId,
            },
          },
        },
      },
    },
    sort: ['type:asc', 'createdAt:asc'],
    pagination: {
      limit: -1,
    },
  });
};
