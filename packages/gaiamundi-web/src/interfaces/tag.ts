import { ApiData } from './api';

export interface Tag {
  name: string;
  type: string;
  count?: number;
}

export interface GroupedTags {
  [key: string]: ApiData<Tag>[];
}
