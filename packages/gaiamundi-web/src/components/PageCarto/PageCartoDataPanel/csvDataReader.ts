import { validateCsv } from 'utils/file';

export const readCsvDatas = async (csvFile: File) => {
  try {
    const data = await validateCsv(csvFile);
    if (data.errors.length > 0) {
      console.warn(`CSV Collection parse error : `, data.errors);
    }
    // This is done to set the displayed filename after the file is uploaded
  } catch (e) {
    console.log(e);
  }
};
