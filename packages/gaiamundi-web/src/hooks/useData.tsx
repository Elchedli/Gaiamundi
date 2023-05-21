import { Alert } from 'components/Alert/Alert';
import { LoadingMessage } from 'components/Loader/LoadingMessage';
import { RawDatum, RawDatumType } from 'interfaces/chart';
import { createContext, FC, ReactNode, useContext, useMemo } from 'react';
import { useQuery } from 'react-query';
import { getPageCartoData } from 'services/dataset';
import { getDataTypeMap } from 'utils/chart';
import { calculateIndicator } from 'utils/equation';
import { usePageCarto } from './usePageCarto';

type DatasetContextType = {
  rawData: RawDatum[];
  dataKeys: Record<string, RawDatumType>;
};

const initialContext: DatasetContextType = {
  rawData: [],
  dataKeys: {},
};

const DatasetContext = createContext<DatasetContextType>(initialContext);

type DataProviderProps = {
  pageCartoId: number;
  children: ReactNode;
};

export const DataProvider: FC<DataProviderProps> = ({
  pageCartoId,
  children,
}) => {
  const { indicators } = usePageCarto();
  const {
    data: sourceData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['page-carto-dataset', pageCartoId],
    queryFn: async () => await getPageCartoData(pageCartoId),
    enabled: !!pageCartoId,
  });

  const rawData = useMemo(
    () =>
      sourceData?.map((datum) => {
        // Calculate indicators
        const computedDatum = indicators.reduce((acc, indicator) => {
          acc[indicator.name] = calculateIndicator(indicator, datum);
          return acc;
        }, {} as RawDatum);
        return {
          // Original data
          ...datum,
          // Computed data (calculated indicators)
          ...computedDatum,
        };
      }),
    [sourceData, indicators]
  );

  const dataKeys = useMemo(() => {
    if (rawData && rawData.length > 0) {
      return getDataTypeMap(rawData[0]);
    }
    return {};
  }, [rawData]);

  if (isLoading) {
    return <LoadingMessage />;
  }

  if (error) {
    return <Alert>Erreur lors du chargement des données</Alert>;
  }

  console.info('>>>>> Raw Data :', rawData);

  return (
    <DatasetContext.Provider
      value={{
        rawData: rawData || [],
        dataKeys,
      }}
    >
      {children}
    </DatasetContext.Provider>
  );
};

export const useData = () => {
  return useContext(DatasetContext);
};
