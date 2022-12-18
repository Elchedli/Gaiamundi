import { ApiData, ApiDocument } from './api';
import { User } from './user';

export interface GeoMapAttributes {
  name: string;
  owner?: ApiDocument<User>;
  yearValidity?: number;
  source?: string;
  license?: string;
  geojson: JSON;
}

export type GeoMap = ApiData<GeoMapAttributes>;
