import { ApiData } from './api';
import { UploadedFile } from './file';
import { User } from './user';

export interface GeoProperty {
  name: string;
  sample: string;
  isGeoCode: boolean;
}

export interface GeoMapBase {
  perimetre: string;
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
  owner: ApiData<User>;
  geoJSON: ApiData<UploadedFile>;
}
