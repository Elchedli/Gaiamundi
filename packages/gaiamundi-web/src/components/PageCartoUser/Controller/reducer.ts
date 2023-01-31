import { TAction, tagsGroupedByType, tagsInterface } from './types';

export const reducerTags = (
  state: tagsInterface,
  action: TAction
): tagsInterface => {
  switch (action.type) {
    case 'FETCH_DATA': {
      return {
        ...state,
        tagsInitial: action.dataGiven as tagsGroupedByType,
        tagsTotal: action.dataGiven as tagsGroupedByType,
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
      const tagType = action.tagType;

      const newTagsSelected = [
        ...state.tagsSelected,
        state.tagsTotal[tagType][index],
      ];
      const newTagsTotal: tagsGroupedByType = {
        ...state.tagsTotal,
        [tagType]: [
          ...state.tagsTotal[tagType].slice(0, index),
          ...state.tagsTotal[tagType].slice(index + 1),
        ],
      };
      return {
        ...state,
        tagsSelected: newTagsSelected,
        tagsTotal: newTagsTotal,
      };
    }

    case 'DELETE_TAG': {
      const index = action.index;
      const tagType: string = state.tagsSelected[index].attributes.type;
      const newTagsTotal: tagsGroupedByType = {
        ...state.tagsTotal,
        [tagType]: [...state.tagsTotal[tagType], state.tagsSelected[index]],
      };
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

    case 'RESET_ALL':
      return {
        ...state,
        tagsTotal: state.tagsInitial,
        tagsSelected: [],
      };
    default:
      return state;
  }
};
