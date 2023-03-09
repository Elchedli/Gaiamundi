import { Alert } from 'components/Alert/Alert';
import { ApiErrorAlert } from 'components/Alert/ApiErrorMessage';
import { LoadingMessage } from 'components/Loader/LoadingMessage';
import PageCartoItem from 'components/PageCarto/List/PageCartoItem';
import { Pagination } from 'components/Pagination/Pagination';
import { useAuth } from 'hooks/useAuth';
import { ApiError } from 'interfaces/api';
import { PageCarto } from 'interfaces/page-carto';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { ContentType, QueryParams, strapi } from 'services/strapi';

export const PageCartoUserList = ({
  searchKeywords,
  selectedTags,
}: {
  searchKeywords: string;
  selectedTags: number[];
}) => {
  const paginationLimit = 9;
  const [page, setPage] = useState(1);
  const { user } = useAuth();

  const {
    data: response,
    isError,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['page-carto-user', page, searchKeywords, selectedTags],
    queryFn: () => {
      return strapi.get<PageCarto>(ContentType.PAGE_CARTOS, {
        filters: {
          owner: {
            id: {
              $eq: user?.id,
            },
          },
          $or: [
            {
              name:
                searchKeywords != ''
                  ? {
                      $contains: searchKeywords,
                    }
                  : {},
            },
            {
              html:
                searchKeywords != ''
                  ? {
                      $contains: searchKeywords,
                    }
                  : {},
            },
          ],
          $and: [
            {
              tags: {
                id:
                  selectedTags.length != 0
                    ? {
                        $in: selectedTags,
                      }
                    : {},
              },
            },
          ],
        } as QueryParams['filters'],
        populate: '*',
        sort: 'createdAt:desc',
        pagination: {
          page,
          pageSize: paginationLimit,
        },
      });
    },
  });

  if (isLoading) {
    return <LoadingMessage />;
  }

  if (isError) {
    return <ApiErrorAlert error={error as ApiError} />;
  }

  return (
    <div>
      {!response || response.data.length === 0 ? (
        <Alert
          type="info"
          className="bg-transparent border-transparent w-fit grid justify-center items-center"
        >
          <div data-testid="error-message">Aucun contenu à afficher.</div>
        </Alert>
      ) : (
        <>
          <div className={`grid grid-cols-3 gap-y-10 gap-x-6`}>
            {response.data.map((page) => {
              return <PageCartoItem key={page.id} {...page} />;
            })}
          </div>
          <div className="flex flex-row mt-5 justify-center">
            <Pagination
              page={page}
              onPaginateNext={() => setPage(page + 1)}
              onPaginatePrevious={() => setPage(page - 1)}
              onPaginate={(p: number) => setPage(p)}
              totalPages={response.meta.pagination.pageCount || 0}
            />
          </div>
        </>
      )}
    </div>
  );
};
