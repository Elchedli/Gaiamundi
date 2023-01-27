import { ApiData } from 'interfaces/api';
import { Tag } from 'interfaces/page-carto';
import { TAction, tagsInterface } from './types';

export const reducerTags = (state: tagsInterface, action: TAction) => {
  switch (action.type) {
    case 'FETCH_DATA': {
      return {
        ...state,
        tagsTotal: action.payload as ApiData<Tag>[],
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
    case 'ADD_TAG': {
      const index = action.index;
      const newTagsSelected = [
        ...state.tagsSelected,
        state.tagsTotal.at(index)!,
      ];
      const newTagsTotal = [
        ...state.tagsTotal.slice(0, index),
        ...state.tagsTotal.slice(index + 1),
      ];
      return {
        ...state,
        tagsSelected: newTagsSelected,
        tagsTotal: newTagsTotal,
      };
    }

    case 'DELETE_TAG': {
      const index = action.index;
      const newTagsTotal = [...state.tagsTotal, state.tagsSelected.at(index)!];
      const newTagsSelected = [
        ...state.tagsSelected.slice(0, index),
        ...state.tagsSelected.slice(index + 1),
      ];
      return {
        ...state,
        tagsTotal: newTagsTotal,
        tagsSelected: newTagsSelected,
      };
    }

    case 'MAP_SEARCH':
      return {
        ...state,
        nameInput: action.nameInput,
      };
    default:
      return state;
  }
};
