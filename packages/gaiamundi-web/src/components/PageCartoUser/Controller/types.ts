import { ApiData } from 'interfaces/api';
import { Tag } from 'interfaces/page-carto';

export interface tagsInterface {
  nameInput: string;
  tagsInitial: ApiData<Tag>[];
  tagsTotal: ApiData<Tag>[];
  tagsSelected: ApiData<Tag>[];
  index: number;
  isLoading?: boolean;
  error?: any;
}

export type TAction =
  | {
      payload: ApiData<Tag>[];
      type: 'FETCH_DATA';
    }
  | {
      error: unknown;
      type: 'FETCH_ERROR';
    }
  | {
      index: number;
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
