/**
 * map controller
 */

import { factories } from "@strapi/strapi";
import path from "path";
import fs from "fs";
import geojson2svg from "geojson-to-svg";

export default factories.createCoreController(
  "api::geo-map.geo-map",
  ({ strapi }) => ({
    async thumbnail(ctx) {
      try {
        // get map by id
        const mapId = ctx.params.id;
        const entry = await strapi.entityService.findOne(
          "api::geo-map.geo-map",
          mapId,
          {
            fields: ["name"],
            populate: { geoJSON: true },
          }
        );

        // compute svg path
        const svgFilename = `${entry.geoJSON.hash}.svg`;
        const svgPath = path.join(
          strapi.dirs.static.public,
          "thumbnails",
          svgFilename
        );
        let svg;
        if (!fs.existsSync(svgPath)) {
          // generate svg thumbnail
          const geoJsonPath = path.join(
            strapi.dirs.static.public,
            "uploads",
            `${entry.geoJSON.hash}${entry.geoJSON.ext}`
          );
          const data = require(geoJsonPath);
          svg = geojson2svg()
            .projection(([x, y]) => [x, -y])
            .render(data);
          fs.writeFileSync(svgPath, svg);
        } else {
          // get existing svg thumbnail
          svg = fs.readFileSync(svgPath, { encoding: "utf8", flag: "r" });
        }
        ctx.type = "image/svg+xml; charset=utf-8";
        ctx.body = svg;
      } catch (err) {
        console.log(err);
        ctx.body = err;
      }
    },
  })
);
