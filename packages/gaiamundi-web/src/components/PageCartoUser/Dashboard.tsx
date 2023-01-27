import { useEffect, useReducer } from 'react';
import { Tag } from 'interfaces/page-carto';
import { ContentType, strapi } from 'services/strapi';
import { FilterContext } from 'hooks/useFilter';
import { PageCartoUserList } from './PageSection/PageCartoUserList';
import { initialState } from './Controller/initialState';
import { reducerTags } from './Controller/reducer';
import { PageCartoFilterBar } from './FilterSection/FilterBar';

export const Dashboard: React.FC = () => {
  const [state, dispatch] = useReducer(reducerTags, initialState);
  useEffect(() => {
    const fetchData = async () => {
      try {
        await strapi
          .get<Tag>(ContentType.TAGS, {
            populate: '*',
            sort: 'createdAt:desc',
          })
          .then((data) => dispatch({ type: 'FETCH_DATA', payload: data.data }));
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
      <PageCartoFilterBar />
      <PageCartoUserList />
    </FilterContext.Provider>
  );
};
