import { ApiDocument } from './api';
import { Dataset } from './dataset';
import { User } from './user';

export interface DatasetColumnBase {
  name: string;
  source: string;
  validity: boolean;
}

export interface DatasetColumnStub extends DatasetColumnBase {
  owner: number;
  dataset: number;
}

export interface DatasetColumn extends DatasetColumnBase {
  owner: ApiDocument<User>;
  dataset: ApiDocument<Dataset>;
}
