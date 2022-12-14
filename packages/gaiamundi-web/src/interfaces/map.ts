import { ApiSingleContentType } from './api';
import { User } from './user';

export interface GeoMapAttributes {
  name: string;
  owner?: ApiSingleContentType<User>;
  yearValidity?: number;
  source?: string;
  license?: string;
  geojson: JSON;
}
