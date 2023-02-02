/**
 * tag controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::tag.tag", ({ strapi }) => ({
  async countItems(ctx) {
    try {
      const entryAll = await strapi.entityService.findMany("api::tag.tag", {
        populate: { page_cartos: true },
      });
      ctx.body = entryAll.map((x) => {
        return {
          [x.id]: x.page_cartos.length,
        };
      });
    } catch (err) {
      console.log(err);
      ctx.body = err;
    }
  },
  async countItem(ctx) {
    try {
      const tagId = ctx.params.id;

      const entry = await strapi.entityService.findOne("api::tag.tag", tagId, {
        populate: { page_cartos: true },
      });
      const count = await entry.page_cartos.length;
      ctx.body = count;
    } catch (err) {
      console.log(err);
      ctx.body = err;
    }
  },
}));
