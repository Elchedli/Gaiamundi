import { TagsSelector } from 'components/TagsSelector/TagsSelector';
import { usePageCarto } from 'hooks/usePageCarto';
import { FC, useState } from 'react';

const TagsPageCarto: FC = () => {
  const { data } = usePageCarto();
  const [selectedTagIds, setSelectedTagIds] = useState<number[]>(
    data?.data.tags.map((tag) => tag.id) || []
  );

  const handleTagsChange = (selectedTagIds: number[]) => {
    setSelectedTagIds(selectedTagIds);
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
