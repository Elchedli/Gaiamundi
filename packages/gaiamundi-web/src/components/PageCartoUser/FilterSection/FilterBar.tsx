import { Label } from 'components/Forms/Inputs/Label';
import { Badge } from 'components/Tags/Badge';
import { useFilterPageCarto } from 'hooks/useFilter';
import { ApiData } from 'interfaces/api';
import { Tag } from 'interfaces/page-carto';
import { useEffect } from 'react';
import { ContentType, strapi } from 'services/strapi';
import { SearchInputDebounce } from './InputDebounce';

export const PageCartoFilterBar: React.FC = () => {
  const { state, dispatch } = useFilterPageCarto();

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

  const inputChange = (nameInput: string) => {
    dispatch({ type: 'MAP_SEARCH', nameInput });
  };

  return (
    <>
      <Label htmlFor="Nom">Recherche</Label>
      <SearchInputDebounce
        id="pageCarto.search"
        className="w-fit mb-10"
        name="inputSearch"
        rebound={inputChange}
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
    </>
  );
};
