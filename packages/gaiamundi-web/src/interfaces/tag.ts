import { ApiData } from './api';

export interface Tag {
  name: string;
  count?: number;
}

export interface GroupedTags {
  [key: string]: ApiData<Tag>[];
}
