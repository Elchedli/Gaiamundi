const axios = require("axios");
import Papa from "papaparse";

export const csvUrlParse = async (urlCsvFile: string) => {
  const { data } = await axios.get(urlCsvFile);
  return Papa.parse(data).data;
};
