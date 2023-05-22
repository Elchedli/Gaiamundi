/**
 * data-fragment router
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

export default createCoreRouter("api::data-fragment.data-fragment", {
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
