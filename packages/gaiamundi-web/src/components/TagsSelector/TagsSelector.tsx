import { PlusIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { Alert } from 'components/Alert/Alert';
import { ApiErrorAlert } from 'components/Alert/ApiErrorMessage';
import { LoadingMessage } from 'components/Loader/LoadingMessage';
import { useToast } from 'hooks/useToast';
import { ApiData, ApiDocument, ApiError } from 'interfaces/api';
import { Tag } from 'interfaces/tag';
import { useMemo, useRef, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { createTag, getAllTags } from 'services/tag';

interface TagsSelectorProps {
  onChange: (tags: number[]) => void;
}

export const TagsSelector: React.FC<TagsSelectorProps> = ({ onChange }) => {
  const [selectedTagIds, setSelectedTagIds] = useState<number[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { addToast } = useToast();

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

  const createTagMutation = useMutation<ApiDocument<Tag>, ApiError, Tag>({
    mutationFn: async (newTag: Tag): Promise<ApiDocument<Tag>> => {
      return await createTag(newTag);
    },
    onSuccess: ({ data }: ApiDocument<Tag>) => {
      addToast({
        title: 'Nouveau Tag créé',
        description: 'Votre Tag a été ajouté avec succès',
        type: 'success',
      });
      handleTagSelect(data);
      setInputValue('');
      onChange([...selectedTagIds, data.id]);
      refetch();
    },
  });

  const tags = useMemo(() => response?.data || [], [response]);
  const searchTags = useMemo(
    () =>
      tags.filter((tag) => {
        const keywords = inputValue.toLowerCase();
        return (
          tag.name.toLowerCase().includes(keywords) &&
          tag.id &&
          !selectedTagIds.includes(tag.id)
        );
      }),

    [tags, inputValue, selectedTagIds]
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

  if (!response || response.data.length === 0) {
    return (
      <Alert type="info" className="grid h-fit justify-center items-center">
        <div data-testid="empty-message">Aucun tag n&apos;a été trouvé !</div>
      </Alert>
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
    const newTag: Tag = { name: inputValue };
    createTagMutation.mutateAsync(newTag);
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
              <XMarkIcon className="h-4 w-4" />
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
              <PlusIcon className="h-5 w-5" />
            </button>
          ))}
      </div>
    </div>
  );
};
