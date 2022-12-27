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

export type Media = ApiDocument<MediaAttributes>;

export interface TagAttributes {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

type Tag = ApiData<TagAttributes>;

export interface PageCartoAttributes {
  id?: string;
  name: string;
  owner?: ApiDocument<User>;
  map: GeoMap;
  html: string;
  tags?: ApiCollection<Tag>;
  cover?: Media;
}

export type PageCarto = ApiData<PageCartoAttributes>;
