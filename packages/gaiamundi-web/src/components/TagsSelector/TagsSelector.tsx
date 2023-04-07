import { ApiErrorAlert } from 'components/Alert/ApiErrorMessage';
import { LoadingMessage } from 'components/Loader/LoadingMessage';
import { ApiData, ApiError } from 'interfaces/api';
import { Tag } from 'interfaces/tag';
import { useMemo, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { createTag, getAllTags } from 'services/tag';

interface TagsSelectorProps {
  onChange: (tags: number[]) => void;
}

export const TagsSelector: React.FC<TagsSelectorProps> = ({ onChange }) => {
  const [selectedTagIds, setSelectedTagIds] = useState<number[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    data: response,
    isError,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['tags'],
    queryFn: async () => await getAllTags(),
  });

  // useMutation() => POST / PUT
  // Use the heroicons package

  const tags = useMemo(() => response?.data || [], [response]);
  const searchTags = useMemo(
    () =>
      tags.filter((tag) => {
        const keywords = inputValue.toLowerCase();
        return tag.name.toLowerCase().includes(keywords) && tag.id;
      }),
    [tags, inputValue]
  );
  const selectedTags = useMemo(
    () =>
      tags.filter((tag) => {
        return selectedTagIds.includes(tag.id);
      }),
    [tags, selectedTagIds]
  );

  if (isLoading) {
    return <LoadingMessage data-testid="tags-loading-message" />;
  }

  if (isError) {
    return (
      <ApiErrorAlert error={error as ApiError} data-testid="error-message" />
    );
  }

  const handleTagSearch = (inputValue: string) => {
    setInputValue(inputValue);
  };

  const handleTagSelect = (tag: ApiData<Tag>) => {
    const isSelected = selectedTagIds.includes(tag.id);
    if (!isSelected) {
      const selectedIds = [...selectedTagIds, tag.id];
      setSelectedTagIds(selectedIds);
      onChange(selectedIds);
    }
    setInputValue('');
    if (inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  };

  const handleTagDeselect = (tag: ApiData<Tag>) => {
    setSelectedTagIds(selectedTagIds.filter((id) => id !== tag.id));
  };

  const handleSubmit = () => {
    const inputValue = inputRef.current?.value ?? '';
    const newTag: Tag = { name: inputValue, type: 'Géographique' };
    createTag(newTag);
    handleTagSelect(newTag);
    setInputValue('');
    onChange([...selectedTagIds, newTag]);
    refetch();
  };

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.keyCode === 13) {
      handleSubmit();
    }
  }

  return (
    <div className="w-2/5">
      <div className="flex flex-wrap" data-testid="selected-tags">
        {selectedTags.map((tag) => (
          <span
            key={tag.id}
            className="bg-blue-600 text-white selected-tag px-1 py-1 rounded-md mr-2 my-2 overflow-hidden whitespace-nowrap break-words"
          >
            {tag.name}
            <button
              className="pl-1 py-1"
              onClick={() => handleTagDeselect(tag)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                width="18"
                height="12"
              >
                <path d="M18.293 5.293a1 1 0 0 0-1.414 0L12 10.586 7.707 6.293a1 1 0 0 0-1.414 1.414L10.586 12l-4.293 4.293a1 1 0 1 0 1.414 1.414L12 13.414l4.293 4.293a1 1 0 0 0 1.414-1.414L13.414 12l4.879-4.879a1 1 0 0 0 0-1.414z" />
              </svg>
            </button>
          </span>
        ))}
        <input
          ref={inputRef}
          className="px-2 py-1 my-1 border-2 rounded-md"
          type="text"
          placeholder="Search tags"
          onChange={(e) => handleTagSearch(e.target.value)}
          value={inputValue}
          onKeyDown={handleKeyDown}
          data-testid="tags-input"
        />
      </div>
      <div className="flex flex-wrap" data-testid="tags-filter">
        {inputValue != null &&
          inputValue !== '' &&
          searchTags.slice(0, 10).map((tag) => (
            <button
              key={tag.id}
              className="bg-slate-300 selected-tag px-1 py-1 rounded-md mr-2 my-2 flex items-center"
              onClick={() => handleTagSelect(tag)}
            >
              {tag.name}&nbsp;
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                width="18"
                height="12"
              >
                <path d="M12 5v7h7v2h-7v7h-2v-7H5v-2h5V5h2z" />
              </svg>
            </button>
          ))}
      </div>
    </div>
  );
};
