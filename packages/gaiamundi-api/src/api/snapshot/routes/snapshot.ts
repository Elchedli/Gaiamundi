/**
 * snapshot router
 */

const { createCoreRouter } = require("@strapi/strapi").factories;
export default createCoreRouter("api::snapshot.snapshot", {
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
