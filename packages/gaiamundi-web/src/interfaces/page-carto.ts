import { ApiCollection, ApiData, ApiDocument } from './api';
import { GeoMap } from './geo-map';
import { User } from './user';

export interface MediaAttributes {
  id: number;
  name: string;
  alternativeText?: string;
  caption?: string;
  width?: number;
  height?: number;
  formats: {
    [key: string]: {
      extension: string;
      url: string;
      size: number;
      hash: string;
      mime: string;
      width?: number;
      height?: number;
    };
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl?: string;
  provider: string;
  provider_metadata?: unknown;
  created_at: string;
  updated_at: string;
}

export interface tagAttributes {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface PageCartoAttributes {
  id?: string;
  name: string;
  owner?: ApiDocument<User>;
  map: GeoMap;
  html: HTMLElement;
  tags?: tagsCarto;
  cover?: MediaCarto;
}

type MediaCarto = ApiDocument<MediaAttributes>;
type tagsCarto = ApiCollection<ApiData<tagAttributes>>;
export type PageCarto = ApiData<PageCartoAttributes>;
