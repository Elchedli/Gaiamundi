import { ApiData } from './api';
import { UploadedFile } from './file';
import { User } from './user';

export interface DatasetBase {
  name: string;
  origin: number;
  isPublic: boolean;
}

export interface DatasetStub extends DatasetBase {
  owner: number;
  csv: number;
}

export interface Dataset extends DatasetBase {
  owner: ApiData<User>;
  csv: ApiData<UploadedFile>;
}
