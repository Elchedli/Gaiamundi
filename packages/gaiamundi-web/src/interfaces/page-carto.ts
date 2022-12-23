import { ApiData, ApiDocument } from './api';
import { GeoMap } from './geo-map';
import { User } from './user';

export interface Tags {
  id: number;
  name: string;
  type: string[];
}

export interface PageCartoAttributes {
  id?: string;
  name: string;
  owner?: ApiDocument<User>;
  map: GeoMap;
  html: HTMLElement;
  tags: Tags;
  cover?: MediaImage;
}

export type PageCarto = ApiData<PageCartoAttributes>;
