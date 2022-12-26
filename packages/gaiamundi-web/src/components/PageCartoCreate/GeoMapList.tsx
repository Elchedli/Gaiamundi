import { useQuery } from 'react-query';
import { useState } from 'react';
import { ApiErrorAlert } from 'components/Alert/ApiErrorMessage';
import { LoadingMessage } from 'components/Loader/LoadingMessage';
import { ContentType, strapi } from 'services/strapi';
import { Alert } from 'components/Alert/Alert';
import { ApiError } from 'interfaces/api';
import { Pagination } from 'components/Pagination/Pagination';
import GeoListItem from './GeoListItem';

export const GeoMapList = () => {
  const [page, setPage] = useState(1);
  const paginationLimit = 9;
  const {
    data: response,
    isError,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['latest-geo-carto', page],
    queryFn: () => {
      return strapi.get(ContentType.GEO_MAPS, {
        populate: '*',
        sort: 'createdAt:desc',
        pagination: {
          page: page,
          pageSize: paginationLimit,
        },
      });
    },
    keepPreviousData: true,
  });

  if (isLoading) {
    return <LoadingMessage />;
  }

  if (isError) {
    return <ApiErrorAlert error={error as ApiError} />;
  }

  if (response?.data.length === 0) {
    return <Alert type="info">Aucun contenu à afficher.</Alert>;
  }

  const totalPages = response?.meta.pagination.total;
  return (
    <div>
      <div className="grid grid-cols-3 gap-y-10 gap-x-6">
        {response?.data.map((page) => {
          return <GeoListItem key={page.id} {...page} />;
        })}
      </div>
      <div className="flex flex-row mt-5 justify-center">
        <Pagination
          page={page}
          onPaginateNext={() => setPage(page + 1)}
          onPaginatePrevious={() => setPage(page - 1)}
          onPaginate={(p: number) => setPage(p)}
          totalPages={Math.ceil(totalPages! / paginationLimit)}
        />
      </div>
    </div>
  );
};
