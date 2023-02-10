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
const findIdField = (obj: any, idTables: string[]) =>
  Object.keys(obj).find((key) => idTables.includes(key));

const mapIdField = (obj: any, idField: string) => {
  const newObj = { ...obj };
  newObj.geocode = newObj[idField];
  idField !== "geocode" ?? delete newObj[idField];
  return newObj;
};

export const fuseObjectsUniqueId = (csvList: [], idTables: string[]): any[] => {
  return csvList.reduce((acc, curr) => {
    const idField: string = findIdField(curr, idTables) || "";
    const geocode = curr[idField];
    const existing = acc.find((obj: any) => obj.geocode === geocode);

    if (existing) {
      Object.assign(existing, mapIdField(curr, idField));
    } else {
      acc.push(mapIdField(curr, idField));
    }

    return acc;
  }, []);
};
