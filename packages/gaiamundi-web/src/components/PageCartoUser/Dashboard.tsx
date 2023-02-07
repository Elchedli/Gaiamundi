import { useState } from 'react';
import { FilterBar } from './FilterBar';
import { PageCartoUserList } from './PageCartoUserList';

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
        <PageCartoUserList nameInput={inputName} tagSelected={tagsSelected} />
      </div>
    </div>
  );
};
