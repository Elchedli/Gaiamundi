/**
 * page-carto controller
 */

import { factories } from "@strapi/strapi";
import path from "path";
import { csvFileParser } from "../../../utils/parsingCSV";

export default factories.createCoreController(
  "api::page-carto.page-carto",
  ({ strapi }) => ({
    async csvParsing(ctx) {
      try {
        const id = ctx.params.id;
        const model = await strapi.entityService.findOne(
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

        const fragments = model.data_fragments;
        const tableKeys: string[] = [];
        const csvDatas: Array<any> = await Promise.all(
          fragments.map(async (fragment): Promise<any> => {
            const file = fragment.dataset.csv;
            const filename = `${file.hash}${file.ext}`;
            const csvPath = path.join(
              strapi.dirs.static.public,
              "uploads",
              filename
            );
            tableKeys.push(
              fragment.columns.find((column) => column.isGeoCode).name
            );
            return await csvFileParser(csvPath);
          })
        );

        ctx.body = csvDatas;
      } catch (err) {
        console.log(err);
        ctx.body = err;
      }
    },
  })
);
