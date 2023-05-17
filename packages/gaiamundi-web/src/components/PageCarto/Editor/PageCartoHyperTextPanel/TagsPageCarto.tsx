//import { Badge } from 'components/Badge/Badge';
import { ApiErrorAlert } from 'components/Alert/ApiErrorMessage';
import { Badge } from 'components/Badge/Badge';

import { Label } from 'components/Inputs/Label';
import { LoadingMessage } from 'components/Loader/LoadingMessage';
import { TagsSelector } from 'components/TagsSelector/TagsSelector';
import { usePageCarto } from 'hooks/usePageCarto';
import { ApiData, ApiError } from 'interfaces/api';
import { PageCartoForm } from 'interfaces/page-carto';
import { Tag } from 'interfaces/tag';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { useQuery } from 'react-query';
import { getPageCartoById } from 'services/page-carto';
interface TagsProp {
  tags: ApiData<Tag>[];
}
const TagsPageCarto: FC<TagsProp> = () => {
  const { pageCartoId } = usePageCarto();
  /*const [selectedTagIds, setSelectedTagIds] = useState<ApiData<Tag>[]>([
    response?.data.tags,
  ]);*/
  const methods = useForm<PageCartoForm>();
  const {
    formState: { errors },
    control,
  } = methods;

  const {
    data: response,
    isError,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['tags-page-carto'],
    queryFn: async () => {
      return await getPageCartoById(pageCartoId);
    },
  });

  if (isLoading) {
    return (
      <LoadingMessage data-testid="page-carto-user-list-loading-message" />
    );
  }

  if (isError) {
    return (
      <ApiErrorAlert
        error={error as ApiError}
        data-testid="pagecarto-user-list-error-message"
      />
    );
  }

  /*const tags = useMemo(() => response?.data || [], [response]);
  const selectedTags = useMemo(
    () =>
      selectedTagIds.map((id) => {
        return tags.find((tag) => id === tag.id) as ApiData<Tag>;
      }),
    [tags, selectedTagIds]
  );
  */ /* const handleTagDeselect = (tag: ApiData<Tag>) => {
    setSelectedTagIds(selectedTagIds.filter((id) => id !== tag.id));
  };*/
  /* <XMarkIcon
                  onClick={() => handleTagDeselect(tag)}
                  className="cursor-pointer ml-2 h-4 w-4 inline-block"
                /> */
  console.log(response?.data.tags);
  return (
    <>
      <div className="mt-3">
        {response?.data.tags.map((tag, index) => {
          return (
            <>
              <Badge className="inline-block" key={index}>
                {tag.name}
              </Badge>
            </>
          );
        })}
      </div>

      <div>
        <Label htmlFor="Tags">Tags</Label>
        <Controller
          name="tags"
          control={control}
          defaultValue={[]}
          render={({ field }) => {
            return <TagsSelector {...field} />;
          }}
        />
        {errors.tags && (
          <div className="mt-2 text-xs text-red-600">{errors.tags.message}</div>
        )}
      </div>
    </>
  );
};

export default TagsPageCarto;
