import { ApiData, ApiDocument } from './api';
import { GeoMap } from './geo-map';
import { User } from './user';

export interface Tags {
  id: number;
  name: string;
  type: string[];
}

export interface PageCartoAttributes {
  name: string;
  cover?: File;
  owner?: ApiDocument<User>;
  map?: ApiDocument<GeoMap>;
  html?: string;
  tags?: Tags;
}

export type PageCarto = ApiData<PageCartoAttributes>;
