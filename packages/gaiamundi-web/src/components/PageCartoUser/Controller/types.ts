import { ApiData } from 'interfaces/api';
import { Tag } from 'interfaces/page-carto';

export interface tagsGroupedByType {
  [key: string]: ApiData<Tag>[];
}
export interface tagsInterface {
  nameInput: string;
  tagsInitial: tagsGroupedByType;
  tagsTotal: tagsGroupedByType;
  tagsSelected: ApiData<Tag>[];
  index?: number;
  tagType?: string;
  isLoading?: boolean;
  error?: any;
}

export type TAction =
  | {
      dataGiven: tagsGroupedByType;
      type: 'FETCH_DATA';
    }
  | {
      error: unknown;
      type: 'FETCH_ERROR';
    }
  | {
      index: number;
      tagType: string;
      type: 'ADD_TAG';
    }
  | {
      index: number;
      type: 'DELETE_TAG';
    }
  | {
      nameInput: string;
      type: 'MAP_SEARCH';
    }
  | {
      type: 'RESET_ALL';
    };
