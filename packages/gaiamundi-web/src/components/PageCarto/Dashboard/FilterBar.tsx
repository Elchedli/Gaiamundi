import { SearchInputDebounce } from 'components/Inputs/DebouncedSearchInput';
import { ApiData } from 'interfaces/api';
import { Tag } from 'interfaces/page-carto';
import { TagsFilter } from './TagsFilter';

interface FilterBarProps {
  onSearchKeywordChange: (name: string) => void;
  onTagChange: (id: number[]) => void;
  tags: ApiData<Tag>[];
}

export const FilterBar: React.FC<FilterBarProps> = ({
  onSearchKeywordChange,
  onTagChange,
  tags: response,
}) => {
  return (
    <div className="w-full">
      <SearchInputDebounce
        id="pageCarto.search"
        className="w-full my-3"
        name="inputSearch"
        placeholder="Recherche ..."
        onDebouncedChange={onSearchKeywordChange}
      />

      <TagsFilter tags={response} onChange={onTagChange} />
    </div>
  );
};
