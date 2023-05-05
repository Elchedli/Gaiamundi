/**
 * map router
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

export default createCoreRouter("api::geo-map.geo-map", {
  config: {
    create: {
      roles: ["authenticated"],
    },
    update: {
      roles: ["authenticated"],
    },
    delete: {
      roles: ["authenticated"],
    },
    find: {
      roles: ["authenticated"],
    },
    findOne: {
      roles: ["authenticated"],
    },
    thumbnail: {
      roles: ["authenticated"],
    },
  },
});
