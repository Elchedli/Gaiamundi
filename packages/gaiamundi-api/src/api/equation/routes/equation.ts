/**
 * equation router
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

export default createCoreRouter("api::equation.equation", {
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
