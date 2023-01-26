import { Label } from 'components/Forms/Inputs/Label';
import { Badge } from 'components/Tags/Badge';
import { ApiData } from 'interfaces/api';
import { Tag } from 'interfaces/page-carto';
import { useEffect, useReducer } from 'react';
import { ContentType, strapi } from 'services/strapi';
import { PageCartoUserList } from './PageCartoUserList';
import { reducerTags } from './reducerTags';
import { SearchInputDebounce } from '../Forms/Inputs/SearchInputDebounce';

const initialState = {
  tagsTotal: [],
  tagsSelected: [],
  isLoading: true,
  nameInput: '',
  error: null,
  index: 0,
};

export const PageCartoUserInterface: React.FC = () => {
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
    <>
      <div>
        <Label htmlFor="Nom">Recherche</Label>
        <SearchInputDebounce
          id="pageCarto.search"
          className="w-fit mb-10"
          name="inputSearch"
          onSearch={(nameInput) => dispatch({ type: 'MAP_SEARCH', nameInput })}
        />
        <Label htmlFor="Nom">Tags Utiliser : </Label>
        {state.tagsSelected?.map((tag, index) => {
          return (
            <Badge
              href="#"
              key={index}
              onClick={() => dispatch({ type: 'DELETE_TAG', index })}
            >
              {tag.attributes.name}
            </Badge>
          );
        })}
        <br />
        <Label htmlFor="Nom">Tags : </Label>
        {state.tagsTotal?.map((tag: ApiData<Tag>, index: number) => {
          return (
            <Badge
              href="#"
              key={index}
              onClick={() => dispatch({ type: 'ADD_TAG', index })}
            >
              {tag.attributes.name}
            </Badge>
          );
        })}
      </div>
      <PageCartoUserList
        nameInput={state.nameInput}
        tagsTable={state.tagsSelected.map(
          (tag: ApiData<Tag>) => tag.attributes.name
        )}
      />
    </>
  );
};
