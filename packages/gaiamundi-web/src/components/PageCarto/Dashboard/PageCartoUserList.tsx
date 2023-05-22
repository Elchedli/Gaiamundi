import { Alert } from 'components/Alert/Alert';
import { ApiErrorAlert } from 'components/Alert/ApiErrorMessage';
import { LoadingMessage } from 'components/Loader/LoadingMessage';
import PageCartoItem from 'components/PageCarto/List/PageCartoItem';
import { Pagination } from 'components/Pagination/Pagination';
import { useAuth } from 'hooks/useAuth';
import { ApiError } from 'interfaces/api';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { getPageCartoByTagsAndSearch } from 'services/page-carto';
export const PageCartoUserList = ({
  searchKeywords,
  selectedTags,
}: {
  searchKeywords: string;
  selectedTags: number[];
}) => {
  const [page, setPage] = useState(1);
  const { user } = useAuth();
  const searchKeywordsCondition = { $contains: searchKeywords };
  const filters: any = {
    owner: {
      id: {
        $eq: user?.id,
      },
    },
  };
  if (searchKeywords) {
    filters['$or'] = [
      {
        map: {
          $or: [
            {
              name: searchKeywordsCondition,
            },
            {
              yearValidity: searchKeywordsCondition,
            },
            {
              mesh: searchKeywordsCondition,
            },
          ],
        },
      },
      {
        name: searchKeywordsCondition,
      },
      {
        html: searchKeywordsCondition,
      },
    ];
  }
  if (selectedTags.length > 0) {
    filters.tags = {
      id:
        selectedTags.length != 0
          ? {
              $in: selectedTags,
            }
          : {},
    };
  }
  const {
    data: response,
    isError,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['page-carto-user', page, searchKeywords, selectedTags],
    queryFn: async () => getPageCartoByTagsAndSearch(page, filters),
  });
  if (isLoading) {
    return (
      <LoadingMessage data-testid="page-carto-user-list-loading-message" />
    );
  }
  if (isError) {
    return (
      <ApiErrorAlert
        error={error as ApiError}
        data-testid="pagecarto-user-list-error-message"
      />
    );
  }
  return (
    <div>
      {!response || response.data.length === 0 ? (
        <Alert
          type="info"
          className="bg-transparent border-transparent w-full grid justify-center items-center"
        >
          <div data-testid="pagecarto-user-list-error-message">
            Aucun contenu à afficher.
          </div>
        </Alert>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-y-10 gap-x-6">
            {response.data.map((page) => {
              return <PageCartoItem key={page.id} {...page} />;
            })}
          </div>
          <div className="flex flex-row mt-5 justify-center">
            <Pagination
              page={page}
              onPaginate={(p: number) => setPage(p)}
              totalPages={response?.meta.pagination.pageCount || 0}
            />
          </div>
        </>
      )}
    </div>
  );
};
