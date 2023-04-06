import { Alert } from 'components/Alert/Alert';
import { ApiErrorAlert } from 'components/Alert/ApiErrorMessage';
import { LoadingMessage } from 'components/Loader/LoadingMessage';
import { ApiData, ApiError } from 'interfaces/api';
import { Tag } from 'interfaces/tag';
import { useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { createTag, getAllTags } from 'services/tag';

export const TagsSelector: React.FC<{ onData: (tags: Tag[]) => void }> = ({
  onData,
}) => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [searchTags, setSearchTags] = useState<ApiData<Tag>[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [tagListKey, setTagListKey] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

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
    setInputValue(inputValue);
    const filteredTags = response.data.filter((tag) =>
      tag.name.toLowerCase().includes(inputValue.toLowerCase())
    );
    setSearchTags(filteredTags.filter((tag) => !selectedTags.includes(tag)));
  };

  const handleTagSelect = (tag: Tag) => {
    const isSelected = selectedTags.includes(tag);
    if (isSelected) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
      onData([...selectedTags, tag]);
    } else {
      setSelectedTags([...selectedTags, tag]);
      onData([...selectedTags, tag]);
    }
    setInputValue('');
    if (inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
    setTagListKey(tagListKey + 1);
  };

  const handleTagDeselect = (tag: Tag) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag));
  };

  const handleSubmit = () => {
    const inputValue = inputRef.current?.value ?? '';
    if (!searchTags.some((tag) => tag.name === inputValue)) {
      const newTag: Tag = { name: inputValue, type: 'Géographique' };
      createTag(newTag);
      handleTagSelect(newTag);
      setInputValue('');
    }
  };
  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.keyCode === 13) {
      handleSubmit();
    }
    onData(selectedTags);
  }

  return (
    <div className="w-2/5" key={tagListKey}>
      <div className="flex flex-wrap">
        {selectedTags.map((tag) => (
          <span
            key={tag.name}
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
        />
      </div>
      <div className="flex flex-wrap">
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
