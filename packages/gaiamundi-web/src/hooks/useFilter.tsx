import {
  TAction,
  tagsInterface,
} from 'components/PageCartoUser/Controller/types';
import React from 'react';

export const FilterContext = React.createContext<{
  state: tagsInterface;
  dispatch: React.Dispatch<TAction>;
} | null>(null);

export const useFilterPageCarto = () => {
  const context = React.useContext(FilterContext);
  if (!context) {
    throw new Error(
      `useFilterBar must be used within an FilterContext.Provider`
    );
  }
  return context;
};
