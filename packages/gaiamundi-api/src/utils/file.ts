import fs from "fs";
import Papa from "papaparse";
import path from "path";
import { PluginUploadFile } from "../../schemas";

export type CsvCellValue = string | number | boolean | null;

export type GeoIndexedData = {
  [geoCode: string]: Record<string, CsvCellValue>;
};

const getFilePath = (file: PluginUploadFile["attributes"], dirname: string) => {
  const filename = `${file.hash}${file.ext}`;
  return path.join(strapi.dirs.static.public, dirname, filename);
};

const parseCsvFile = (filePath: string) => {
  if (fs.existsSync(filePath)) {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    return Papa.parse<Record<string, CsvCellValue>>(fileContent, {
      header: true,
      transformHeader: (headerName: string) => headerName.toLowerCase(),
    });
  }
  return Promise.reject(new Error(`Unable to read file : ${filePath}`));
};

const findIdField = (obj: Object, idTables: string[]) =>
  Object.keys(obj).find((key) => idTables.includes(key));

const mapIdField = (obj: Object, idField: string, desiredKeyName: string) => {
  const newObj: Object = { ...obj };
  newObj[desiredKeyName] = newObj[idField];
  idField !== desiredKeyName && delete newObj[idField];
  return newObj;
};

const mergeCsvObjectByGeocode = (
  csvList: object[],
  idTables: string[],
  desiredKey: string
) => {
  return csvList.reduce((acc: Array<object>, curr: Object) => {
    const idField: string = findIdField(curr, idTables) || "";
    const geocode = curr[idField];
    const existing = acc.find((obj: Object) => obj[desiredKey] === geocode);
    if (existing) {
      Object.assign(existing, mapIdField(curr, idField, desiredKey));
    } else {
      acc.push(mapIdField(curr, idField, desiredKey));
    }

    return acc;
  }, []);
};

export const optimiseCsvData = async (fragments) => {
  const tableKeys: string[] = [];
  const allCsvData = await Promise.all(
    fragments.map(async (fragment): Promise<object[]> => {
      const csvPath = getFilePath(fragment.dataset.csv, "uploads");
      tableKeys.push(
        fragment.columns.find((column) => column.isGeoCode).name.toLowerCase()
      );
      const { data } = await parseCsvFile(csvPath);
      return data;
    })
  )
    .then((data) => data.flat())
    .then((data: []) => mergeCsvObjectByGeocode(data, tableKeys, "geocode"));

  return allCsvData;
};
