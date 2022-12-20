import { useQuery } from 'react-query';
import { useState } from 'react';
import { ApiErrorAlert } from 'components/Alert/ApiErrorMessage';
import { LoadingMessage } from 'components/Loader/LoadingMessage';
import { ContentType, strapi } from 'services/strapi';
import PageCartoItem from './PageCartoItem';
import { Alert } from 'components/Alert/Alert';
import { ApiError } from 'interfaces/api';
import { Button } from 'components/Button/Button';

export const PageCartoList = () => {
  const [page, setPage] = useState(1);
  const {
    data: response,
    isError,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['latest-page-carto', page],
    queryFn: () => {
      return strapi.get(ContentType.PAGE_CARTOS, {
        populate: '*',
        sort: 'createdAt:desc',
        pagination: {
          page: page,
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

  return (
    <div>
      <div className="grid grid-cols-3 gap-y-10 gap-x-6">
        {response?.data.map((page) => {
          return <PageCartoItem key={page.id} {...page} />;
        })}
      </div>
      <div className="flex flex-row mt-5">
        <Button className="inline-block" onClick={() => setPage(page - 1)}>
          Previous page
        </Button>
        <Button className="inline-block" onClick={() => setPage(page + 1)}>
          Next page
        </Button>
      </div>
    </div>
  );
};
