import { useQuery } from 'react-query';
import { useEffect, useState } from 'react';

import { ApiErrorAlert } from 'components/Alert/ApiErrorMessage';
import { LoadingMessage } from 'components/Loader/LoadingMessage';
import { Alert } from 'components/Alert/Alert';
import { ApiError } from 'interfaces/api';
import { Pagination } from 'components/Pagination/Pagination';
import PageCartoUserItem from './PageCartoUserItem';
import { TextInput } from 'components/Forms/Inputs/TextInput';
import { Label } from 'components/Forms/Inputs/Label';
import { ContentType, strapi } from 'services/strapi';
import { PageCarto } from 'interfaces/page-carto';

export const PageCartoUserList = () => {
  const paginationLimit = 9;

  const [page, setPage] = useState(1);
  const [currentUser, setCurrentUser] = useState('');
  const [name, setName] = useState('');

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

  type FilterOperator =
    | '$eq' //	Equal
    | '$eqi' //	Equal (case-insensitive)
    | '$ne' //	Not equal
    | '$lt' //	Less than
    | '$lte' //	Less than or equal to
    | '$gt' //	Greater than
    | '$gte' //	Greater than or equal to
    | '$in' //	Included in an array
    | '$notIn' //	Not included in an array
    | '$contains' //	Contains
    | '$notContains' //	Does not contain
    | '$containsi' //	Contains (case-insensitive)
    | '$notContainsi' //	Does not contain (case-insensitive)
    | '$null' //	Is null
    | '$notNull' //	Is not null
    | '$between' //	Is between
    | '$startsWith' //	Starts with
    | '$endsWith' //	Ends with
    | '$or' //	Joins the filters in an "or" expression
    | '$and'; //	Joins the filters in an "and" expression

  type Filters = {
    [field: string]: {
      [operator in FilterOperator]?: any;
    };
  };
  const {
    data: response,
    isError,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['page-carto-user', page, name, currentUser],
    queryFn: () => {
      return strapi.get<PageCarto>(ContentType.PAGE_CARTOS, {
        filters: {
          owner: {
            username: {
              $eq: currentUser,
            },
          },
          // name: {
          //   $eq: name,
          // },
        } as Filters,
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

  // const searchPageCartos = (e: any) => {
  //   setName('hallo');
  // };
  return (
    <div>
      <div>
        <Label htmlFor="Nom">Recherche</Label>
        <TextInput
          id="geoMap.name"
          className="w-fit mb-10"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
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
