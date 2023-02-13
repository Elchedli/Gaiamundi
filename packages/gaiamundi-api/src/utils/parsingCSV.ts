import fs from "fs";
import Papa from "papaparse";

export const csvFileParser = async (filePath: string) => {
  if (fs.existsSync(filePath)) {
    const File = await fs.readFileSync(filePath, "utf-8");
    return Papa.parse(File, {
      header: true,
      transformHeader: (headerName: string) => headerName.toLowerCase(),
    }).data;
  }
  return null;
};
const findIdField = (obj: Object, idTables: string[]) =>
  Object.keys(obj).find((key) => idTables.includes(key));

const mapIdField = (obj: Object, idField: string, desiredKeyName: string) => {
  const newObj: Object = { ...obj };
  newObj[desiredKeyName] = newObj[idField];
  idField !== desiredKeyName && delete newObj[idField];
  return newObj;
};

export const mergeCsvObjectByGeocode = (
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
