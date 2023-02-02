import config from 'config';
import { Tag } from 'interfaces/page-carto';
import { ContentType, strapi } from './strapi';
export const getAllTags = async () => {
  return await strapi.get<Tag>(ContentType.TAGS, {
    populate: '*',
    sort: ['type:asc', 'createdAt:desc'],
  });
};

export const countTagApi = async () => {
  const data = await fetch(`${config.API_URL}/api/tag/counter`);
  return data.json();
};
