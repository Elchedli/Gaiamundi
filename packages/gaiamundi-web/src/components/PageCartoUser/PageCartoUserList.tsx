import { useQuery } from 'react-query';
import { useEffect, useState } from 'react';
import { ApiErrorAlert } from 'components/Alert/ApiErrorMessage';
import { LoadingMessage } from 'components/Loader/LoadingMessage';
import { Alert } from 'components/Alert/Alert';
import { ApiError } from 'interfaces/api';
import { Pagination } from 'components/Pagination/Pagination';
import PageCartoUserItem from './PageCartoUserItem';
import { ContentType, QueryParams, strapi } from 'services/strapi';
import { PageCarto } from 'interfaces/page-carto';

export const PageCartoUserList = ({ nameInput, tagsTable }: any) => {
  const paginationLimit = 9;

  const [page, setPage] = useState(1);
  const [currentUser, setCurrentUser] = useState('');

  useEffect(() => {
    const userGetData = async () => {
      return strapi.token && (await strapi.currentUser(strapi.token));
    };
    userGetData().then((user) => {
      if (user) {
        setCurrentUser(user.username);
      }
    });
  }, []);

  const {
    data: response,
    isError,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['page-carto-user', page, currentUser, nameInput, tagsTable],
    queryFn: () => {
      return strapi.get<PageCarto>(ContentType.PAGE_CARTOS, {
        filters: {
          owner: {
            username: {
              $eq: currentUser,
            },
          },
          $or: [
            {
              name:
                nameInput != ''
                  ? {
                      $contains: nameInput,
                    }
                  : {},
            },
            {
              html:
                nameInput != ''
                  ? {
                      $contains: nameInput,
                    }
                  : {},
            },
          ],
          $and: [
            {
              tags: {
                name:
                  tagsTable.length != 0
                    ? {
                        $in: tagsTable,
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

  if (!response || response.data.length === 0) {
    return <Alert type="info">Aucun contenu à afficher.</Alert>;
  }

  const { data, meta } = response;

  return (
    <div>
      <div className="grid grid-cols-3 gap-y-10 gap-x-6">
        {data.map((page) => {
          return <PageCartoUserItem key={page.id} {...page} />;
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
