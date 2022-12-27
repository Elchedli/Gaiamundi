import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useQuery } from 'react-query';
import { ContentType, strapi } from 'services/strapi';
import GeoListItem from './GeoListItem';
import { Pagination } from 'components/Pagination/Pagination';
import { User } from 'interfaces/user';

export const GeoListPick = () => {
  const paginationLimit = 9;

  const [page, setPage] = useState(1);
  const [selectedTab, setSelectedTab] = useState(0);
  const [currentUser, setCurrentUser] = useState<Partial<User>>({});

  useEffect(() => {
    const userGetData = async () => {
      return strapi.token && (await strapi.currentUser(strapi.token));
    };
    userGetData().then((user) => user && setCurrentUser(user));
  }, []);

  const { data: response } = useQuery({
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

  const geoMaps = response?.data;
  let MapCounter = 0;
  const GeoList = (
    <>
      <h2 className="pb-4 text-3xl font-extrabold">Toutes les cartes</h2>
      <div className="grid grid-cols-3 gap-y-10 gap-x-6">
        {geoMaps?.map((page) => {
          MapCounter++;
          return <GeoListItem key={page.id} {...page} />;
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
    </>
  );

  const geoMapsUser = geoMaps?.filter(
    (element) =>
      element.attributes.owner?.data.attributes.username == currentUser.username
  );

  MapCounter = 0;
  const GeoListUser = (
    <>
      <h2 className="pb-4 text-3xl font-extrabold">Mes cartes GeoJSON</h2>
      <div className="grid grid-cols-3 gap-y-10 gap-x-6">
        {geoMapsUser?.map((page) => {
          MapCounter++;
          return <GeoListItem key={page.id} {...page} />;
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
    </>
  );

  const geoTab = [
    {
      id: 1,
      title: 'Mes cartes',
    },
    {
      id: 2,
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
          {geoTab.map((table, index) => (
            <div
              key={index}
              className={classNames(
                'rounded-t-lg p-4 text-sm font-medium leading-5 text-blue-700 cursor-pointer',
                'ring-blue ring-opacity-60 ring-offset-1 ring-offset-blue-400 focus:outline-none focus:ring-1',
                index === selectedTab
                  ? 'bg-white shadow'
                  : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
              )}
              onClick={() => setSelectedTab(index)}
            >
              {table.title}
            </div>
          ))}
        </div>
        <div className="rounded-b-lg border border-blue-700 p-5">
          {selectedTab == 0 ? GeoList : GeoListUser}
        </div>
      </div>
    </div>
  );
};
