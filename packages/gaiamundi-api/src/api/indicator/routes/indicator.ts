/**
 * indicator router
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

export default createCoreRouter("api::indicator.indicator", {
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
  },
});
