import { ApiCollection, ApiDocument } from './api';
import { DatasetColumn } from './dataset-column';
import { UploadedFile } from './file';
import { GeoMap, GeoMapStub } from './geo-map';
import { User } from './user';

export interface Tag {
  id: number;
  name: string;
  type: string;
}

export interface PageCartoBase {
  name: string;
  html: string;
}

export interface PageCartoStub extends PageCartoBase {
  owner?: number;
  cover?: number;
  map?: number;
  tags?: number[];
  columns?: number[];
}

export interface PageCarto extends PageCartoBase {
  owner: ApiDocument<User>;
  cover: ApiDocument<UploadedFile>;
  map: ApiDocument<GeoMap>;
  tags: ApiCollection<Tag>;
  columns: ApiCollection<DatasetColumn>;
}

export type PageCartoForm = { name: string; geoMap: GeoMapStub };
