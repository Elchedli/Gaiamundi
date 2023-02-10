import fs from "fs";
import Papa from "papaparse";

export const csvFileParser = async (filePath: string) => {
  if (fs.existsSync(filePath)) {
    const File = await fs.readFileSync(filePath, "utf-8");
    return Papa.parse(File).data;
  }
  return null;
};
