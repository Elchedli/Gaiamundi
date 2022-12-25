import { ApiDocument } from './api';

export interface UploadedFile {
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
