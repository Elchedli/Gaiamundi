import { ApiData } from 'interfaces/api';
import { Tag } from 'interfaces/page-carto';

export interface tagsInterface {
  nameInput: string;
  tagsTotal: ApiData<Tag>[];
  tagsSelected?: boolean[];
  isLoading?: boolean;
  error?: any;
}

export const reducerTagsColored = (state: tagsInterface, action: any) => {
  switch (action.type) {
    case 'FETCH_DATA': {
      const tagsSelected = Array(action.payload.length).fill(false);
      return {
        ...state,
        tagsTotal: action.payload,
        tagsSelected: tagsSelected,
        isLoading: false,
        error: null,
      };
    }

    case 'FETCH_ERROR':
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };

    case 'HANDLE_TAG': {
      const index: number = action.index;
      const newTagsSelected = [...state.tagsSelected!];
      newTagsSelected[index] = !newTagsSelected[index];
      return {
        ...state,
        tagsSelected: newTagsSelected,
      };
    }

    case 'SEARCH_MAP':
      return {
        ...state,
        nameInput: action.nameInput,
      };
    default:
      return state;
  }
};
