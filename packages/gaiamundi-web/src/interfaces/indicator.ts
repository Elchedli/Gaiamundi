import { ApiDocument } from './api';
import { PageCarto } from './page-carto';

export interface IndicatorBase {
  name: string;
  description: string;
  source: string;
  validity: number;
  equation: string;
}

export interface IndicatorStub extends IndicatorBase {
  page_carto?: number;
}

export interface Indicator extends IndicatorBase {
  page_carto: ApiDocument<PageCarto>;
}
