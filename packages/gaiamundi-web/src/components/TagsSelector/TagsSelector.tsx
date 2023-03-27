import { Alert } from 'components/Alert/Alert';
import { ApiErrorAlert } from 'components/Alert/ApiErrorMessage';
import { TextAreaInput } from 'components/Inputs/TextAreaInput';
import { LoadingMessage } from 'components/Loader/LoadingMessage';
import { ApiData, ApiError } from 'interfaces/api';
import { Tag } from 'interfaces/tag';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { getAllTags } from 'services/tag';

export const TagsSelector: React.FC = () => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [searchTags, setSearchTags] = useState<ApiData<Tag>[]>([]);

  const {
    data: response,
    isError,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['tags'],
    queryFn: async () => getAllTags(),
  });
  if (isLoading) {
    return <LoadingMessage data-testid="filter-bar-loading-message" />;
  }

  if (isError) {
    return <ApiErrorAlert error={error as ApiError} />;
  }

  if (!response || response.data.length === 0) {
    return (
      <Alert type="info" className="grid h-fit justify-center items-center">
        <div data-testid="filter-bar-error-message">
          Aucun tag n&apos;a été trouvé !
        </div>
      </Alert>
    );
  }
  const handleTagSearch = (inputValue: string) => {
    const filteredTags = response.data.filter((tag) =>
      tag.name.toLowerCase().includes(inputValue.toLowerCase())
    );
    setSearchTags(filteredTags);
  };

  const handleTagSelect = (tag: Tag) => {
    const isSelected = selectedTags.includes(tag);
    if (isSelected) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <div className="grid grid-cols-5 gap-5">
      <div className="col-span-2">
        <TextAreaInput
          placeholder="Rechercher un tag"
          onChange={(e) => handleTagSearch(e.target.value)}
        />
        Tags sélectionnés: {selectedTags.map((tag) => tag.name).join(', ')}
      </div>
      <div className="col-span-3">
        {selectedTags && (
          <ul>
            {searchTags.map((tag) => (
              <li key={tag.id} onClick={() => handleTagSelect(tag)}>
                {tag.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
