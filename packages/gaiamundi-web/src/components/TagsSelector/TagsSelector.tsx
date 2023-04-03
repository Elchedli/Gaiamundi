import { Alert } from 'components/Alert/Alert';
import { ApiErrorAlert } from 'components/Alert/ApiErrorMessage';
import { LoadingMessage } from 'components/Loader/LoadingMessage';
import { ApiData, ApiError } from 'interfaces/api';
import { Tag } from 'interfaces/tag';
import { useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { getAllTags } from 'services/tag';

export const TagsSelector: React.FC = () => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [searchTags, setSearchTags] = useState<ApiData<Tag>[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
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
    setSearchTags(filteredTags);
  };

  const handleTagSelect = (tag: Tag) => {
    const isSelected = selectedTags.includes(tag);
    if (isSelected) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
    setSearchTags([]);
    setInputValue('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  const handleTagDeselect = (tag: Tag) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag));
  };

  return (
    <div className="w-2/5">
      <div className="flex flex-wrap">
        {selectedTags.map((tag) => (
          <span
            key={tag.name}
            className="bg-blue-500 selected-tag px-1 py-1 rounded-md mr-2 my-2 overflow-hidden whitespace-nowrap break-words"
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
          className="px-2 py-1 my-1 border-2"
          type="text"
          placeholder="Search tags"
          onChange={(e) => handleTagSearch(e.target.value)}
          value={inputValue}
        />
      </div>
      <div>
        {searchTags.map((tag) => (
          <button
            key={tag.id}
            className="bg-slate-300 selected-tag px-1 py-1 rounded-md mr-2 my-2"
            onClick={() => handleTagSelect(tag)}
          >
            {tag.name}&nbsp;
            <button>
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
          </button>
        ))}
      </div>
    </div>
  );
};
