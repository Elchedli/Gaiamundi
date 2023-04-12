import { ApiData } from './api';
import { PageCarto } from './page-carto';

export type IndicatorVariable = {
  columnName: string;
  alias: string;
  sample: number;
};

export interface IndicatorBase {
  name: string;
  description: string;
  source: string;
  validity: number;
  equation: string;
  variables: IndicatorVariable[];
}

export interface IndicatorStub extends IndicatorBase {
  page_carto?: number;
}

export interface Indicator extends IndicatorBase {
  page_carto?: ApiData<PageCarto>;
}
