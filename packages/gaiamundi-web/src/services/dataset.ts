import { DatasetStub } from 'interfaces/dataset';
import { ContentType, strapi } from './strapi';

export const createDataset = async (data: DatasetStub) => {
  return await strapi.create<DatasetStub>(ContentType.DATASET, data);
};

export const uploadCsv = async (file: File) => {
  return await strapi.uploadFile(file, 'api::dataset.dataset');
};
