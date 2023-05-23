import { TagsSelector } from 'components/TagsSelector/TagsSelector';
import { usePageCarto } from 'hooks/usePageCarto';
import { useToast } from 'hooks/useToast';
import { ApiError } from 'interfaces/api';
import { FC, useState } from 'react';
import { useMutation } from 'react-query';
import { updatePageCarto } from 'services/page-carto';

const TagsPageCarto: FC = () => {
  const { data } = usePageCarto();
  const [selectedTagIds, setSelectedTagIds] = useState<number[]>(
    data?.data.tags.map((tag) => tag.id) || []
  );
  const { addToast } = useToast();

  const updateTagsPageCarto = useMutation<void, ApiError, number[]>({
    mutationFn: async (selectedTags: number[]) => {
      await updatePageCarto(data?.data.id || 0, { tags: selectedTags });
    },
    onSuccess: async () => {
      addToast({
        title: 'Mise à jour des tags',
        description: 'Les tags de la pageCarto ont été mis à jour avec succès',
        type: 'success',
      });
    },
  });

  const handleTagsChange = (selectedTagIds: number[]) => {
    setSelectedTagIds(selectedTagIds);
    updateTagsPageCarto.mutate(selectedTagIds);
  };

  return (
    <div>
      <TagsSelector
        onChange={handleTagsChange}
        selectedTagsIdsExisting={selectedTagIds}
      />
    </div>
  );
};

export default TagsPageCarto;
