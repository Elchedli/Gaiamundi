import React, { useState } from 'react';

type IndicatorContextValue = {
  chosenIndicator: chosenIndicatorProps;
  changeIndicator: (data: chosenIndicatorProps) => void;
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
export const IndicatorProvider = ({
  children,
}: IndicatorProviderProps): JSX.Element => {
  const [chosenIndicator, setchooseIndicator] = useState<chosenIndicatorProps>({
    indicatorName: '',
    type: '',
  });

  return (
    <IndicatorContext.Provider
      value={{ chosenIndicator, changeIndicator: setchooseIndicator }}
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
