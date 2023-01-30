import { Button } from 'components/Button/Button';
import { Label } from 'components/Forms/Inputs/Label';
import { Badge } from 'components/Tags/Badge';
import { useFilterPageCarto } from 'hooks/useFilter';
import { ApiData } from 'interfaces/api';
import { Tag } from 'interfaces/page-carto';
import { useEffect } from 'react';
import { ContentType, strapi } from 'services/strapi';
import { SearchInputDebounce } from './InputDebounce';

export function groupBy<T, K extends keyof T>(
  array: T[],
  key: K
): Map<T[K], T[]> {
  return array.reduce((acc: any, cur) => {
    const group = cur[key];
    acc.has(group) ? acc.get(group).push(cur) : acc.set(group, [cur]);
    return acc;
  }, new Map<T[K], T[]>());
}

export const PageCartoFilterBar: React.FC = () => {
  const { state, dispatch } = useFilterPageCarto();
  const tagTypes = ['Géographie', 'Thématique'];
  useEffect(() => {
    const fetchData = async () => {
      try {
        await strapi
          .get<Tag>(ContentType.TAGS, {
            populate: '*',
            sort: ['type:asc', 'createdAt:desc'],
          })
          .then((data) => {
            const apiVariable: Array<ApiData<any>> = data.data;
            console.log(apiVariable);
            // const dataTotal = groupBy(apiVariable);
            //Sdkqsdksqkdsqkdsqkdkqssdkkdqsss
            dispatch({ type: 'FETCH_DATA', payload: data.data });
          });
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
    <div className="lg:max-w-sm ">
      <div>
        <SearchInputDebounce
          id="pageCarto.search"
          className="max-lg:w-full my-3"
          name="inputSearch"
          placeholder="Recherche ..."
          rebound={inputChange}
        />
        {state.tagsSelected.length != 0 && (
          <div className="flex justify-between">
            <Label htmlFor="Nom" className="text-base flex self-center">
              Filtres
            </Label>
            <Button
              type="button"
              color="transparent"
              className="text-base"
              onClick={() => dispatch({ type: 'RESET_ALL' })}
            >
              Effacer tout
            </Button>
          </div>
        )}

        <div className="">
          {state.tagsSelected?.map((tag, index) => {
            return (
              <Badge
                href="#"
                className="px-4 py-2 rounded-full text-gray-200 bg-gray-600 border border-gray-300 font-semibold text-sm inline-flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease"
                onClick={() => dispatch({ type: 'DELETE_TAG', index })}
                key={tag.attributes.id}
                iconAfter={
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="times"
                    className="w-3 ml-3"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 352 512"
                  >
                    <path
                      fill="currentColor"
                      d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
                    ></path>
                  </svg>
                }
              >
                {tag.attributes.name}
              </Badge>
            );
          })}
        </div>
      </div>

      {tagTypes.map((tagType) => (
        <>
          {state.tagsTotal.filter((x) => x.attributes.type == tagType).length !=
            0 && <Label className="text-xl">{tagType}</Label>}
          <div className="my-3">
            {state.tagsTotal
              .filter((x) => x.attributes.type == tagType)
              .map((tag: ApiData<Tag>, index: number) => {
                return (
                  <Badge
                    href="#"
                    key={tag.attributes.id}
                    className="lg:block w-fit"
                    onClick={() => dispatch({ type: 'ADD_TAG', index })}
                  >
                    {tag.attributes.name}
                  </Badge>
                );
              })}
          </div>
        </>
      ))}
    </div>
  );
};
