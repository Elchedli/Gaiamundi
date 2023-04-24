import React, { useState } from 'react';

type IndicatorContextValue = {
  chosenIndicator: chosenIndicatorProps;
  changeIndicator: (data: chosenIndicatorProps) => void;
  chosenPalette: Array<string>;
  changePalette: (data: string) => void;
};

const IndicatorContext = React.createContext<IndicatorContextValue | null>(
  null
);
IndicatorContext.displayName = 'IndicatorContext';

export interface IndicatorProviderProps {
  children: React.ReactNode;
}
export interface chosenIndicatorProps {
  indicatorName: string;
  type: string;
}
export interface chosenPaletteProps {
  [key: string]: Array<string>;
}

const paletteColors: chosenPaletteProps = {
  red: ['violet', 'green', 'blue', 'yellow', 'red'],
  brown: ['red', 'yellow', 'blue', 'green', 'violet'],
  chinese: [],
  noChinese: [],
};

export const IndicatorProvider = ({
  children,
}: IndicatorProviderProps): JSX.Element => {
  const [chosenIndicator, setChosenIndicator] = useState<chosenIndicatorProps>({
    indicatorName: '',
    type: '',
  });

  const [chosenPalette, setchosenPalette] = useState<Array<string>>(
    paletteColors.rouge
  );

  const changeIndicator = (value: chosenIndicatorProps) => {
    setChosenIndicator(value);
  };

  const changePalette = (value: string) => {
    setchosenPalette(paletteColors[value]);
  };

  return (
    <IndicatorContext.Provider
      value={{
        chosenIndicator,
        changeIndicator,
        chosenPalette,
        changePalette,
      }}
    >
      {children}
    </IndicatorContext.Provider>
  );
};

export const useIndicator = () => {
  const context = React.useContext(IndicatorContext);
  if (!context) {
    throw new Error(`useIndicator must be used within an IndicatorProvider`);
  }
  return context;
};
