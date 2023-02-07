import { ApiCollection, ApiDocument } from './api';
import { Column } from './column';
import { Dataset } from './dataset';

export interface DataFragmentStub {
  columns: number[];
  dataset: number;
  page_carto: number;
}

export interface DataFragment {
  columns: ApiCollection<Column>;
  dataset: ApiDocument<Dataset>;
}
