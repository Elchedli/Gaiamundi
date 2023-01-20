import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useQuery } from 'react-query';
import { ContentType, QueryParams, strapi } from 'services/strapi';
import GeoListItem from './GeoListItem';
import { Pagination } from 'components/Pagination/Pagination';
import { User } from 'interfaces/user';
import { GeoMap } from 'interfaces/geo-map';

export const GeoMapList = () => {
  const paginationLimit = 9;

  const [page, setPage] = useState(1);
  const [selectedTab, setSelectedTab] = useState(0);
  const [currentUser, setCurrentUser] = useState<Partial<User>>({});
  const [filters, setFilters] = useState<QueryParams['filters']>({});

  useEffect(() => {
    const userGetData = async () => {
      return strapi.token && (await strapi.currentUser(strapi.token));
    };
    userGetData().then((user) => {
      if (user) {
        setCurrentUser(user);
        setFilters({
          'owner][username': {
            $eq: user.username,
          },
        });
      }
    });
  }, []);

  const { data: response } = useQuery({
    queryKey: ['latest-geo-carto', page, filters],
    queryFn: () => {
      return strapi.get<GeoMap>(ContentType.GEO_MAPS, {
        filters: filters,
        populate: '*',
        sort: 'createdAt:desc',
        pagination: {
          page: page,
          pageSize: paginationLimit,
        },
      });
    },
  });

  let MapCounter = 0;

  const handleTabClick = (index: number) => {
    setSelectedTab(index);
    setFilters(
      !index
        ? {
            'owner][username': {
              $eq: currentUser.username,
            },
          }
        : {}
    );
  };

  const GeoMap = [
    {
      id: 0,
      title: 'Mes cartes',
    },
    {
      id: 1,
      title: 'Toutes les cartes',
    },
  ];
  return (
    <div>
      <h2 className="pb-4 text-3xl font-extrabold">
        Réutiliser une carte GeoJSON
      </h2>
      <div className="flex-column">
        <div className="flex bg-blue-600 rounded-t-lg p-2">
          {GeoMap.map((table, index) => (
            <div
              key={table.id}
              className={classNames(
                'rounded-t-lg p-4 text-sm font-medium leading-5 text-blue-700 cursor-pointer',
                'ring-blue ring-opacity-60 ring-offset-1 ring-offset-blue-400 focus:outline-none focus:ring-1',
                index === selectedTab
                  ? 'bg-white shadow'
                  : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
              )}
              onClick={() => handleTabClick(index)}
            >
              {table.title}
            </div>
          ))}
        </div>
        <div className="rounded-b-lg border border-blue-700 p-5">
          <h2 className="pb-4 text-3xl font-extrabold">Toutes les cartes</h2>
          <div className="grid grid-cols-3 gap-y-10 gap-x-6">
            {response?.data.map((page) => {
              MapCounter++;
              return <GeoListItem key={page.attributes.name} {...page} />;
            })}
          </div>
          <div className="flex flex-row mt-5 justify-center">
            <Pagination
              page={page}
              onPaginateNext={() => setPage(page + 1)}
              onPaginatePrevious={() => setPage(page - 1)}
              onPaginate={(p: number) => setPage(p)}
              totalPages={Math.ceil(MapCounter / paginationLimit)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
