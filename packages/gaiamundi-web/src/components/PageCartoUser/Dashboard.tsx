import { useState } from 'react';
import { FilterBar } from './FilterBar';
import { PageCartoUserList } from './PageCartoUserList';

export const Dashboard: React.FC = () => {
  const [inputName, setInputName] = useState('');
  const [tagsSelected, setTagsSelected] = useState<number[]>([]);

  const safeChangeSearchInput = (name: string) => setInputName(name);
  const SafeChangeTags = (tagsTable: number[]) => setTagsSelected(tagsTable);

  return (
    <div className="grid min-[1024px]:grid-flow-col mt-5 p-4 rounded-lg shadow-xl">
      <FilterBar
        onSearchKeywordChange={(name: string) => safeChangeSearchInput(name)}
        onTagChange={SafeChangeTags}
      />
      <PageCartoUserList nameInput={inputName} tagSelected={tagsSelected} />
    </div>
  );
};
