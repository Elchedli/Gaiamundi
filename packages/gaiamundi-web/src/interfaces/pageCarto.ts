import { GeoMap } from './map';
import { User } from './user';

export interface Tags {
  id: number;
  name: string;
  type: string[];
}

export interface PageCarto {
  id?: string;
  name: string;
  owner: User;
  map: GeoMap;
  html: HTMLElement;
  tags: Tags;
}
