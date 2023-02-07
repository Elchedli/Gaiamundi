import { SearchInputDebounce } from '../Forms/Inputs/DebouncedSearchInput';
import { TagsFilter } from './TagsFilter';

interface FilterBarProps {
  onSearchKeywordChange: (name: string) => void;
  onTagChange: (id: number[]) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  onSearchKeywordChange,
  onTagChange,
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

      <TagsFilter onChange={onTagChange} />
    </div>
  );
};
