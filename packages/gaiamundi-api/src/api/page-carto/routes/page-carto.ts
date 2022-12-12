/**
 * page-carto router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::page-carto.page-carto', {
    prefix: "",
    only: ["find", "findOne", "create", "update", "delete"],
    except: [],
    config: {
      find: {
        auth: false,
        policies: [],
        middlewares: [],
      },
      findOne: {
        auth: false,
        policies: [],
        middlewares: [],
      },
      create: {
      },
      update: {
      },
      delete: {
      },
    },
  });
