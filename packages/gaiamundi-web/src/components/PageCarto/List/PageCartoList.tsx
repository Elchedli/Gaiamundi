import { useState } from 'react';
import { useQuery } from 'react-query';

import { Alert } from 'components/Alert/Alert';
import { ApiErrorAlert } from 'components/Alert/ApiErrorMessage';
import { LoadingMessage } from 'components/Loader/LoadingMessage';
import PageCartoItem from 'components/PageCarto/List/PageCartoItem';
import { Pagination } from 'components/Pagination/Pagination';
import { ApiError } from 'interfaces/api';
import { getLatestPageCartos } from 'services/page-carto';

export const PageCartoList = () => {
  const [page, setPage] = useState(1);
  const paginationLimit = 9;
  const {
    data: response,
    isError,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['latest-page-carto', page],
    queryFn: async () => {
      return await getLatestPageCartos(page, paginationLimit);
    },
    keepPreviousData: true,
  });

  if (isLoading) {
    return <LoadingMessage />;
  }

  if (isError) {
    return <ApiErrorAlert error={error as ApiError} />;
  }

  if (!response || response.data.length === 0) {
    return <Alert type="info">Aucun contenu à afficher.</Alert>;
  }

  const { data, meta } = response;

  return (
    <div>
      <div className="grid grid-cols-3 gap-y-10 gap-x-6">
        {data.map((page) => {
          return <PageCartoItem key={page.id} {...page} />;
        })}
      </div>
      <div className="flex flex-row mt-5 justify-center">
        <Pagination
          page={page}
          onPaginateNext={() => setPage(page + 1)}
          onPaginatePrevious={() => setPage(page - 1)}
          onPaginate={(p: number) => setPage(p)}
          totalPages={meta.pagination.pageCount || 0}
        />
      </div>
    </div>
  );
};
