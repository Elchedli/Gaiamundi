import { useEffect, useReducer } from 'react';
import { Tag } from 'interfaces/page-carto';
import { ContentType, strapi } from 'services/strapi';
import { FilterContext } from 'hooks/useFilter';
import { PageCartoUserList } from './PageSection/PageCartoUserList';
import { initialState } from './Controller/initialState';
import { reducerTags } from './Controller/reducer';
import { PageCartoFilterBar } from './FilterSection/FilterBar';
import { groupByApiData } from 'utils/strapiUtils';
import { ApiData } from 'interfaces/api';
import { tagsGroupedByType } from './Controller/types';

export const Dashboard: React.FC = () => {
  const [state, dispatch] = useReducer(reducerTags, initialState);
  useEffect(() => {
    const fetchData = async () => {
      try {
        await strapi
          .get<Tag>(ContentType.TAGS, {
            populate: '*',
            sort: ['type:asc', 'createdAt:desc'],
          })
          .then((data) => {
            const groupedTags: tagsGroupedByType = groupByApiData(
              data.data,
              (tag: ApiData<Tag>) => tag.attributes.type
            );
            console.log(Object.entries(groupedTags));
            dispatch({ type: 'FETCH_DATA', dataGiven: groupedTags });
          });
      } catch (error) {
        dispatch({ type: 'FETCH_ERROR', error });
      }
    };
    fetchData();
  }, []);

  return (
    <FilterContext.Provider
      value={{
        dispatch,
        state,
      }}
    >
      <div className="grid min-[1024px]:grid-flow-col mt-5 p-4 rounded-lg shadow-xl">
        <PageCartoFilterBar />
        <PageCartoUserList />
      </div>
    </FilterContext.Provider>
  );
};
