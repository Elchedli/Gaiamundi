import { ApiDocument } from './api';
import { UploadedFile } from './file';
import { User } from './user';

export interface GeoProperty {
  name: string;
  sample: string;
  isGeoCode: boolean;
}

export interface GeoMapBase {
  name: string;
  yearValidity: number;
  source: string;
  license: string;
  properties: GeoProperty[];
}

export interface GeoMapStub extends GeoMapBase {
  owner?: number;
  geoJSON?: number;
}

export interface GeoMap extends GeoMapBase {
  owner: ApiDocument<User>;
  geoJSON: ApiDocument<UploadedFile>;
}
