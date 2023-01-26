import { Label } from 'components/Forms/Inputs/Label';
import { SearchInputDebounce } from 'components/Forms/Inputs/SearchInputDebounce';
import { Badge } from 'components/Tags/Badge';
import { ApiData } from 'interfaces/api';
import { Tag } from 'interfaces/page-carto';
import { useEffect, useReducer } from 'react';
import { ContentType, strapi } from 'services/strapi';
import { PageCartoUserList } from './PageCartoUserList';
import { reducerTagsColored } from './reducerTagsColored';

const initialState = {
  tagsTotal: [],
  isLoading: true,
  nameInput: '',
  error: null,
};

export const PageCartoUserInterfaceColor: React.FC = () => {
  const [state, dispatch] = useReducer(reducerTagsColored, initialState);
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
    <>
      <div>
        <Label htmlFor="Nom">Recherche</Label>
        <SearchInputDebounce
          id="pageCarto.search"
          className="w-fit mb-10"
          name="inputSearch"
          onSearch={(nameInput) => dispatch({ type: 'MAP_SEARCH', nameInput })}
        />
        {state.tagsTotal?.map((tag: ApiData<Tag>, index: number) => {
          return (
            <Badge
              href="#"
              key={index}
              onClick={() => dispatch({ type: 'HANDLE_TAG', index })}
              disabled={state.tagsSelected?.at(index)}
            >
              {tag.attributes.name}
            </Badge>
          );
        })}
      </div>
      <PageCartoUserList
        nameInput={state.nameInput}
        tagsTable={state.tagsTotal
          .filter(
            (val: number, index: number) => !state.tagsSelected!.at(index)
          )
          .map((tag: ApiData<Tag>) => tag.attributes.name)}
      />
    </>
  );
};
