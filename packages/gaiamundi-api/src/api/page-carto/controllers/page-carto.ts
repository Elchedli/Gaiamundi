/**
 * page-carto controller
 */

import { factories } from "@strapi/strapi";
import {
  GeoIndexedData,
  mergeDataByGeocode,
  parseDataByFragment,
} from "../../../utils/file";

export default factories.createCoreController(
  "api::page-carto.page-carto",
  ({ strapi }) => ({
    async get(ctx) {
      // Get PageCarto by id
      const id = ctx.params.id;
      const pageCarto = await strapi.entityService.findOne(
        "api::page-carto.page-carto",
        id,
        {
          populate: {
            data_fragments: {
              populate: {
                dataset: {
                  populate: {
                    csv: true,
                  },
                },
                columns: true,
              },
            },
          },
        }
      );

      if (!pageCarto) {
        throw new Error(`Unable to get PageCarto #${pageCarto}`);
      }

      const fragments = pageCarto.data_fragments;
      const geoIndexedDataCollection: GeoIndexedData[] = await Promise.all(
        fragments.map((fragment) => {
          return parseDataByFragment(fragment);
        })
      );

      const geoIndexedData = mergeDataByGeocode(geoIndexedDataCollection);
      ctx.body = Object.values(geoIndexedData);
    },
  })
);
