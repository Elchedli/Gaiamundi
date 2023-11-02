/**
 * map controller
 */

import { factories } from "@strapi/strapi";
import fs from "fs";
import { GeoJSON2SVG } from "geojson2svg";
import parsePath from "parse-svg-path";
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

        const converterSVG = new GeoJSON2SVG({
          attributes: {
            style: "stroke:black; fill: #FFFFFF;stroke-width:0.5px",
          },
        });

        const converterPath = new GeoJSON2SVG({
          output: "path",
        });

        const dataSVG = converterSVG.convert(data);
        const dataPaths = converterPath.convert(data);

        let width = 0;
        let height = 0;

        for (const path of dataPaths) {
          const points = parsePath(path);
          points.pop();
          const [maxX, maxY] = points.reduce(([xMax, yMax], [,xCurrent,yCurrent])=> [Math.max(xMax,xCurrent),Math.max(yMax,yCurrent)],[0,0])
          if (maxY > height) height = maxY;
          if (maxX > width) width = maxX;
        }
        const dataSVGElements = dataSVG.join("\n")
        svg = `<?xml version="1.0" standalone="no"?>\n<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">\n${dataSVGElements}\n</svg>`;

        fs.writeFileSync(svgPath, svg);
      } else {
        // get existing svg thumbnail
        svg = fs.readFileSync(svgPath, { encoding: "utf8", flag: "r" });
      }
      ctx.type = "image/svg+xml; charset=utf-8";
      ctx.body = svg;
    },
  })
);
