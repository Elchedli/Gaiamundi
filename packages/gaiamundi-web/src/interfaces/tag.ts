import { ApiData } from './api';

export interface Tag {
  id: number;
  name: string;
  type: string;
}

export interface GroupedTags {
  [key: string]: ApiData<Tag>[];
}
