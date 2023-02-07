import { Column } from 'interfaces/column';
import { DataFragmentStub } from 'interfaces/data-fragment';
import { DatasetStub } from 'interfaces/dataset';
import { ContentType, strapi } from './strapi';

// export const createDataset = async (data: DatasetStub) => {
//   return await strapi.create<DatasetStub>(ContentType.DATASET, data);
// };

export const addDataToPageCarto = async (
  pageCartoId: number,
  name: string,
  data: DatasetStub,
  columns: Column[]
) => {
  const dataset = await strapi.create<DatasetStub>(ContentType.DATASET, data);
  return await strapi.create<DataFragmentStub>(ContentType.DATA_FRAGMENT, {
    name: name,
    columns: columns,
    dataset: dataset.data.id,
    page_carto: pageCartoId,
  });
};

export const uploadCsv = async (file: File) => {
  return await strapi.uploadFile(file, 'api::dataset.dataset');
};
