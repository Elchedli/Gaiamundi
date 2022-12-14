import { ApiSingleContentType } from './api';
import { GeoMapAttributes } from './map';
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
  map: GeoMapAttributes;
  html: HTMLElement;
  tags: Tags;
}
