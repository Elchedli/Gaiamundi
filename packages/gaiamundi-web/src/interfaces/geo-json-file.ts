import { ApiData } from './api';
import { UploadedFile } from './file';

export interface GeoJsonFile {
  id: string;
  file: UploadedFile;
  ref?: string;
  refId?: number;
  field?: string;
}

export type GeoJSON = ApiData<GeoJsonFile>;
