/**
 * map controller
 */

import { factories } from "@strapi/strapi";
import fs from "fs";
import geojson2svg from "geojson-to-svg";
import path from "path";

export default factories.createCoreController(
  "api::geo-map.geo-map",
  ({ strapi }) => ({
    async thumbnail(ctx) {
      // get map by id
      const fileId = ctx.params.id;
      const entry = await strapi.entityService.findOne(
        "plugin::upload.file",
        fileId
      );
      console.log(JSON.stringify(entry), entry.hash);
      // compute svg path
      const svgFilename = `${entry.hash}.svg`;
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
          `${entry.hash}${entry.ext}`
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
      console.log("svg : ", typeof svg);
      ctx.body = svg;
    },
    async screenshot(ctx) {
      const fileId = ctx.params.id;
      const svgScreenshot = ctx.params.svg;
      
      const entry = await strapi.entityService.findOne(
        "plugin::upload.file",
        fileId
      );
      console.log(JSON.stringify(entry), entry.hash);
      // compute svg path
      const svgFilename = `${entry.hash}.svg`;
      const screenshotPath = path.join(
        strapi.dirs.static.public,
        "screenshots",
        svgFilename
      );

      fs.writeFileSync(screenshotPath, svgScreenshot);

      ctx.body = "changed";
    },
  })
);
