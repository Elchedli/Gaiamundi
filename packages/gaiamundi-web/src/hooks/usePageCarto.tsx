import { DatasetColumn } from 'interfaces/column';
import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getPageCartoById } from 'services/page-carto';

/**
 * Returns current page carto by id provided in URL if no id is provided
 */
export const usePageCarto = (id?: number) => {
  const params = useParams();
  const pageCartoId = id ? id : parseInt(params.id || '');
  const query = useQuery({
    queryKey: ['page-carto', pageCartoId],
    queryFn: async () => {
      return await getPageCartoById(pageCartoId);
    },
    keepPreviousData: true,
    // The query will not execute until the userId exists
    enabled: !!pageCartoId,
  });

  const pageCarto = query.data;

  console.log('========', pageCarto);

  const map = pageCarto?.data.attributes.map;

  // Compute columns by merging data fragments
  const columns = useMemo(
    () =>
      (pageCarto?.data.attributes.data_fragments?.data || []).reduce(
        (acc, curr) => {
          const cols = curr.attributes.columns
            .filter((column) => {
              return !column.isGeoCode;
            })
            .map((column) => {
              return {
                ...column,
                dataset: curr.attributes.dataset.data.attributes.name,
              };
            });
          return acc.concat(cols);
        },
        [] as DatasetColumn[]
      ),
    [pageCarto]
  );

  const indicators = useMemo(
    () =>
      (pageCarto?.data.attributes.indicators?.data || []).map(
        ({ id, attributes }) => {
          return {
            id,
            ...attributes,
          };
        }
      ),
    [pageCarto]
  );

  return { pageCartoId, map, columns, indicators, ...query };
};
