/**
 * page-carto controller
 */

import { factories } from "@strapi/strapi";
import {
  ConvertCSVToPageCartoData,
  csvUrlParse,
} from "../../../utils/parsingCSV";

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
          fragments.map(async (fragment): Promise<number> => {
            tableKeys.push(
              fragment.columns.find((column) => column.isGeoCode).name
            );
            return await csvUrlParse(
              "http://localhost:1337" + fragment.dataset.csv.url
            );
          })
        );
        const pageCartoData = ConvertCSVToPageCartoData(
          csvDatas,
          tableKeys
        ).fuseObjectsUnique();
        ctx.body = csvDatas;
      } catch (err) {
        console.log(err);
        ctx.body = err;
      }
    },
  })
);
