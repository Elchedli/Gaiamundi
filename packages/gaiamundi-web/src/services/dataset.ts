import { Column } from 'interfaces/column';
import { DataFragmentStub } from 'interfaces/data-fragment';
import { DatasetStub } from 'interfaces/dataset';
import { ContentType, strapi } from './strapi';

// export const createDataset = async (data: DatasetStub) => {
//   return await strapi.create<DatasetStub>(ContentType.DATASET, data);
// };

export const addDataToPageCarto = async (
  pageCartoId: number,
  data: DatasetStub,
  selectedColumns: Column[]
) => {
  const dataset = await strapi.create<DatasetStub>(ContentType.DATASET, data);
  const columns = await Promise.all(
    selectedColumns.map((column) =>
      strapi.create<Column>(ContentType.COLUMN, column)
    )
  );
  return await strapi.create<DataFragmentStub>(ContentType.DATA_FRAGMENT, {
    columns: columns.map((column) => column.data.id),
    dataset: dataset.data.id,
    page_carto: pageCartoId,
  });
};

export const uploadCsv = async (file: File) => {
  return await strapi.uploadFile(file, 'api::dataset.dataset');
};
