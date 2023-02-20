import classNames from 'classnames';
import { Pagination } from 'components/Pagination/Pagination';
import { useAuth } from 'hooks/useAuth';
import { GeoMap } from 'interfaces/geo-map';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { ContentType, QueryParams, strapi } from 'services/strapi';
import GeoListItem from './GeoListItem';

export const GeoMapList = () => {
  const paginationLimit = 9;

  const [page, setPage] = useState(1);
  const [selectedTab, setSelectedTab] = useState(0);
  const { user } = useAuth();

  const { data: response } = useQuery({
    queryKey: ['latest-geo-carto', page, selectedTab],
    queryFn: () => {
      return strapi.get<GeoMap>(ContentType.GEO_MAPS, {
        filters: {
          owner:
            !selectedTab && user != undefined
              ? {
                  id: user.id,
                }
              : {},
        } as QueryParams['filters'],
        populate: '*',
        sort: 'createdAt:desc',
        pagination: {
          page: page,
          pageSize: paginationLimit,
        },
      });
    },
  });

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
            onClick={() => setSelectedTab(index)}
          >
            {table.title}
          </div>
        ))}
      </div>
      <div className="rounded-b-lg border border-blue-700 p-5">
        <div className="grid grid-cols-3 gap-y-10 gap-x-6">
          {response?.data.map((page) => {
            return <GeoListItem key={page.attributes.name} {...page} />;
          })}
        </div>
        <div className="flex flex-row mt-5 justify-center">
          <Pagination
            page={page}
            onPaginateNext={() => setPage(page + 1)}
            onPaginatePrevious={() => setPage(page - 1)}
            onPaginate={(p: number) => setPage(p)}
            totalPages={response?.meta.pagination.pageCount ?? 0}
          />
        </div>
      </div>
    </div>
  );
};
