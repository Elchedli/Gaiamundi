import { ApiData, ApiDocument } from './api';
import { GeoJsonFile } from './geo-json-file';
import { User } from './user';

export interface GeoMapAttributes {
  name: string;
  owner?: ApiDocument<User>;
  yearValidity?: number;
  source?: string;
  license?: string;
  geojson?: ApiDocument<GeoJsonFile>;
}

export type GeoMap = ApiData<GeoMapAttributes>;
