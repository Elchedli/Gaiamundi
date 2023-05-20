import { Alert } from 'components/Alert/Alert';
import { LoadingMessage } from 'components/Loader/LoadingMessage';
import { RawDatum, RawDatumType } from 'interfaces/chart';
import { createContext, FC, ReactNode, useContext, useMemo } from 'react';
import { useQuery } from 'react-query';
import { getPageCartoData } from 'services/dataset';
import { getDataTypeMap } from 'utils/chart';

type DatasetContextType = {
  rawData: RawDatum[];
  dataKeys: Record<string, RawDatumType>;
};

const initialContext: DatasetContextType = {
  rawData: [],
  dataKeys: {},
};

const DatasetContext = createContext<DatasetContextType>(initialContext);

type DatasetProviderProps = {
  pageCartoId: number;
  children: ReactNode;
};

export const DatasetProvider: FC<DatasetProviderProps> = ({
  pageCartoId,
  children,
}) => {
  const {
    data: rawData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['page-carto-dataset', pageCartoId],
    queryFn: async () => await getPageCartoData(pageCartoId),
    enabled: !!pageCartoId,
  });

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

export const useDataset = () => {
  return useContext(DatasetContext);
};
