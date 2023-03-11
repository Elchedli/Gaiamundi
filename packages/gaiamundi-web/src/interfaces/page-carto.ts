import { ApiCollection, ApiDocument } from './api';
import { DataFragment } from './data-fragment';
import { UploadedFile } from './file';
import { GeoMap, GeoMapStub } from './geo-map';
import { Indicator } from './indicator';
import { User } from './user';

export interface Tag {
  id: number;
  name: string;
  type: string;
  count?: number;
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
  data_fragments?: number[];
  indicators?: number[];
}

export interface PageCarto extends PageCartoBase {
  owner: ApiDocument<User>;
  cover: ApiDocument<UploadedFile>;
  map: ApiDocument<GeoMap>;
  tags: ApiCollection<Tag>;
  data_fragments: ApiCollection<DataFragment>;
  indicators: ApiCollection<Indicator>;
}

export type PageCartoForm = { name: string; geoMap: GeoMapStub };
