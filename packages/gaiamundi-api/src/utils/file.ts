import fs from "fs";
import Papa from "papaparse";
import path from "path";
import { PluginUploadFile } from "../../schemas";

export type CsvCellValue = string | number | boolean | null;

export type GeoIndexedData = {
  [geoCode: string]: Record<string, CsvCellValue>;
};

export const getFilePath = (
  file: PluginUploadFile["attributes"],
  dirname: string
) => {
  const filename = `${file.hash}${file.ext}`;
  return path.join(strapi.dirs.static.public, dirname, filename);
};

export const pickCsvColumns = (
  csvRows: Array<Record<string, CsvCellValue>>,
  columns: string[]
): Array<Record<string, CsvCellValue>> => {
  return csvRows.map((row) => {
    return columns.reduce((result, column) => {
      result[column] = row[column];
      return result;
    }, {} as Record<string, CsvCellValue>);
  });
};

export const parseCsvFile = (filePath: string) => {
  if (fs.existsSync(filePath)) {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    return Papa.parse<Record<string, CsvCellValue>>(fileContent, {
      header: true,
      transformHeader: (headerName: string) => {
        // Remove metadata (source & validity) & remove extra spaces
        return headerName.replace(/\[[^\]]*\]/i, "").trim();
      },
    });
  }
  return Promise.reject(new Error(`Unable to read file : ${filePath}`));
};

export const indexDataByGeoCode = (
  data: Array<Record<string, CsvCellValue>>,
  geoCodeColumn: string
) => {
  return data.reduce((acc, curr) => {
    const geoCode = curr[geoCodeColumn] as string;
    if (geoCode) {
      acc[geoCode] = {
        ...curr,
        [geoCodeColumn]: undefined,
      };
    }
    return acc;
  }, {} as GeoIndexedData);
};

export const parseDataByFragment = async (fragment) => {
  const csvPath = getFilePath(fragment.dataset.csv, "uploads");
  const geoCodeColumn = fragment.columns.find(({ isGeoCode }) => isGeoCode);
  if (!geoCodeColumn) {
    throw new Error(`Unable to find the geocode for fragment #${fragment.id}`);
  }
  const { data } = await parseCsvFile(csvPath);
  const columns: string[] = fragment.columns.map(({ name }) => name);
  const fragmentData = pickCsvColumns(data, columns);
  return indexDataByGeoCode(fragmentData, geoCodeColumn.name);
};

export const mergeDataByGeocode = (dataCollection: GeoIndexedData[]) => {
  return dataCollection.reduce((dataDict, geoIndexedData) => {
    return Object.entries(geoIndexedData).reduce((acc, [geoCode, row]) => {
      acc[geoCode] = {
        ...(geoCode in acc ? acc[geoCode] : {}),
        ...row,
        __geoCode__: geoCode,
      };
      return acc;
    }, dataDict);
  }, {});
};
