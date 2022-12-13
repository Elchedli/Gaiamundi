import { ApiSingleContentType } from './api';
import { GeoMap } from './map';
import { User } from './user';

export interface Tags {
  id: number;
  name: string;
  type: string[];
}

export interface PageCartoAttributes {
  id?: string;
  name: string;
  owner?: ApiSingleContentType<User>;
  map: GeoMap;
  html: HTMLElement;
  tags: Tags;
}
