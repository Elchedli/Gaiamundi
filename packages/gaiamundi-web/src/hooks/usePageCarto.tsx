import { Alert } from 'components/Alert/Alert';
import { ApiErrorAlert } from 'components/Alert/ApiErrorMessage';
import { LoadingMessage } from 'components/Loader/LoadingMessage';
import { ApiData, ApiDocument, ApiError } from 'interfaces/api';
import { DatasetColumn } from 'interfaces/column';
import { GeoMap } from 'interfaces/geo-map';
import { Indicator } from 'interfaces/indicator';
import { PageCarto } from 'interfaces/page-carto';
import React, { useMemo } from 'react';
import { useQuery, UseQueryResult } from 'react-query';
import { getPageCartoById } from 'services/page-carto';

type PageCartoContextValue = UseQueryResult<ApiDocument<PageCarto>, unknown> & {
  pageCartoId: number;
  map?: GeoMap;
  columns: DatasetColumn[];
  indicators: ApiData<Indicator>[];
};

const PageCartoContext = React.createContext<PageCartoContextValue | null>(
  null
);
PageCartoContext.displayName = 'PageCartoContext';

export interface PageCartoProviderProps {
  children: React.ReactNode;
  id: number;
}

export const PageCartoProvider = ({
  id,
  children,
}: PageCartoProviderProps): JSX.Element => {
  const query = useQuery({
    queryKey: ['page-carto', id],
    queryFn: async () => {
      return await getPageCartoById(id);
    },
    keepPreviousData: true,
    // The query will not execute until the userId exists
    enabled: !!id,
  });

  const pageCarto = query.data;

  const map = pageCarto?.data?.map;
  // Compute columns by merging data fragments
  const columns = useMemo(
    () =>
      (pageCarto?.data?.data_fragments || []).reduce((acc, curr) => {
        const cols = curr.columns
          .filter((column) => {
            return !column.isGeoCode;
          })
          .map((column) => {
            return {
              ...column,
              dataset: curr.dataset.name,
            };
          });
        return acc.concat(cols);
      }, [] as DatasetColumn[]),
    [pageCarto]
  );

  const indicators = useMemo(
    () => pageCarto?.data?.indicators || [],
    [pageCarto]
  );

  if (query.isLoading) {
    return <LoadingMessage />;
  }

  if (query.isError) {
    return <ApiErrorAlert error={query.error as ApiError} />;
  }

  if (!query.data) {
    return <Alert type="info">Aucun contenu à afficher.</Alert>;
  }

  return (
    <PageCartoContext.Provider
      value={{
        pageCartoId: id,
        map,
        columns,
        indicators,
        ...query,
      }}
    >
      {children}
    </PageCartoContext.Provider>
  );
};

export const usePageCarto = () => {
  const context = React.useContext(PageCartoContext);
  if (!context) {
    throw new Error(`usePageCarto must be used within an PageCartoProvider`);
  }
  return context;
};
