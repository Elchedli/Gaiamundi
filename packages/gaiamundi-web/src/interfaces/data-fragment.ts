import { ApiData } from './api';
import { Column } from './column';
import { Dataset } from './dataset';

export interface DataFragmentBase {
  name: string;
  columns: Column[];
}

export interface DataFragmentStub extends DataFragmentBase {
  dataset: number;
  page_carto: number;
}

export interface DataFragment extends DataFragmentBase {
  dataset: ApiData<Dataset>;
}
