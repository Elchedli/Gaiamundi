import { ApiDocument } from './api';
import { UploadedFile } from './file';
import { User } from './user';

export interface GeoMapBase {
  name: string;
  yearValidity: number;
  source: string;
  license: string;
}

export interface GeoMapStub extends GeoMapBase {
  owner?: number;
  geojson?: number;
}

export interface GeoMap extends GeoMapBase {
  owner?: ApiDocument<User>;
  geojson?: ApiDocument<UploadedFile>;
}

