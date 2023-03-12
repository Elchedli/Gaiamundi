import { ApiData } from './api';
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
  owner: ApiData<User>;
  cover: ApiData<UploadedFile>;
  map: ApiData<GeoMap>;
  tags: ApiData<Tag>[];
  data_fragments: ApiData<DataFragment>[];
  indicators: ApiData<Indicator>[];
}

export type PageCartoForm = { name: string; geoMap: GeoMapStub };
