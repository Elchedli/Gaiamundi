import { XMarkIcon } from '@heroicons/react/24/solid';
import { Alert } from 'components/Alert/Alert';
import { ApiErrorAlert } from 'components/Alert/ApiErrorMessage';
import { Badge } from 'components/Badge/Badge';
import { AutoCompleteInput } from 'components/Inputs/AutoCompleteInput';
import { LoadingMessage } from 'components/Loader/LoadingMessage';
import { useToast } from 'hooks/useToast';
import { ApiData, ApiDocument, ApiError } from 'interfaces/api';
import { Tag } from 'interfaces/tag';
import React, { useMemo, useRef, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { createTag, getAllTags } from 'services/tag';

interface TagsSelectorProps {
  onChange: (tags: number[]) => void;
}

export const TagsSelector: React.FC<TagsSelectorProps> = ({ onChange }) => {
  const [selectedTagIds, setSelectedTagIds] = useState<number[]>([]);
  const { addToast } = useToast();
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

  const createTagMutation = useMutation<ApiDocument<Tag>, ApiError, Tag>({
    mutationFn: async (newTag: Tag): Promise<ApiDocument<Tag>> => {
      return await createTag(newTag);
    },
    onSuccess: async ({ data }: ApiDocument<Tag>) => {
      addToast({
        title: 'Nouveau Tag créé',
        description: 'Votre Tag a été ajouté avec succès',
        type: 'success',
      });
      await refetch();
      handleTagSelect(data);
      onChange([...selectedTagIds, data.id]);
    },
  });

  const tags = useMemo(() => response?.data || [], [response]);
  const selectedTags = useMemo(
    () =>
      selectedTagIds.map((id) => {
        return tags.find((tag) => id === tag.id) as ApiData<Tag>;
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

  const handleTagSelect = (tag: ApiData<Tag>) => {
    const isSelected = selectedTagIds.includes(tag.id);
    if (!isSelected) {
      const selectedIds = [...selectedTagIds, tag.id];
      setSelectedTagIds(selectedIds);
      onChange(selectedIds);
    }
    if (inputRef && inputRef.current) {
      inputRef.current?.focus();
    }
  };

  const handleTagDeselect = (tag: ApiData<Tag>) => {
    setSelectedTagIds(selectedTagIds.filter((id) => id !== tag.id));
  };

  const handleSubmit = (name: string) => {
    const newTag: Tag = { name };
    createTagMutation.mutateAsync(newTag);
  };

  return (
    <div className="w-3/4">
      <div className="flex flex-wrap">
        {selectedTags.map((tag) => (
          <Badge key={tag.id} className="my-1" data-testid="selected-tags">
            {tag.name}
            <XMarkIcon
              onClick={() => handleTagDeselect(tag)}
              className="cursor-pointer ml-2 h-4 w-4 inline-block"
            />
          </Badge>
        ))}
        <AutoCompleteInput<ApiData<Tag>>
          options={tags.filter(({ id }) => !selectedTagIds.includes(id))}
          labelField={'name'}
          onSelect={handleTagSelect}
          onCreate={handleSubmit}
          enableComboBox={false}
          placeholder={'Ajouter des tags ....'}
          emptyMessage={'Aucun tag trouvé! Tapez "Entrée" pour ajouter.'}
          data-testid="tags-input"
          inputReference={inputRef}
        />
      </div>
    </div>
  );
};
