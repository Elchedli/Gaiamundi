import { ApiData } from './api';

export interface Tag {
  name: string;
  type: string;
}

export interface GroupedTags {
  [key: string]: ApiData<Tag>[];
}
