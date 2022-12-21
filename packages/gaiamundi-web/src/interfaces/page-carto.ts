import { ApiCollection, ApiData, ApiDocument } from './api';
import { UploadedFile } from './file';
import { GeoMap } from './geo-map';
import { User } from './user';

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
  cover?: UploadedFile;
}

export type PageCarto = ApiData<PageCartoAttributes>;
