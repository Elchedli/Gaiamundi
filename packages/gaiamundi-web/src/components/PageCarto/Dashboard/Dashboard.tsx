import { FilterBar } from 'components/PageCarto/Dashboard/FilterBar';
import { PageCartoUserList } from 'components/PageCarto/Dashboard/PageCartoUserList';
import { useState } from 'react';
export const Dashboard: React.FC = () => {
  const [inputName, setInputName] = useState('');
  const [tagsSelected, setTagsSelected] = useState<number[]>([]);

  const safeChangeSearchInput = (name: string) => setInputName(name);
  const safeChangeTags = (tagsTable: number[]) => setTagsSelected(tagsTable);

  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="col-span-1">
        <FilterBar
          onSearchKeywordChange={(name: string) => safeChangeSearchInput(name)}
          onTagChange={safeChangeTags}
        />
      </div>
      <div className="col-span-3">
        <PageCartoUserList
          searchKeywords={inputName}
          selectedTags={tagsSelected}
        />
      </div>
    </div>
  );
};
