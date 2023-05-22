import { ApiData } from './api';
import { Chart } from './chart';
import { DataFragment } from './data-fragment';
import { UploadedFile } from './file';
import { GeoMap, GeoMapStub } from './geo-map';
import { Indicator } from './indicator';
import { Tag } from './tag';
import { User } from './user';

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
  charts?: ApiData<Chart>[];
}

export type PageCartoForm = {
  mapId?: number;
  name: string;
  geoMap: GeoMapStub;
  tags: number[];
};
