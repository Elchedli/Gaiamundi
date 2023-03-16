import { Alert } from 'components/Alert/Alert';
import { ApiErrorAlert } from 'components/Alert/ApiErrorMessage';
import { SearchInputDebounce } from 'components/Inputs/DebouncedSearchInput';
import { LoadingMessage } from 'components/Loader/LoadingMessage';
import { useAuth } from 'hooks/useAuth';
import { ApiError } from 'interfaces/api';
import { useQuery } from 'react-query';
import { getAllTagsByOwner } from 'services/tag';
import { TagsFilter } from './TagsFilter';

interface FilterBarProps {
  onSearchKeywordChange: (name: string) => void;
  onTagChange: (id: number[]) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  onSearchKeywordChange,
  onTagChange,
}) => {
  const { user } = useAuth();

  const {
    data: response,
    isError,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['tags', user?.id],
    queryFn: async () => getAllTagsByOwner(user?.id || 0),
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
  return (
    <div className="w-full">
      <SearchInputDebounce
        id="pageCarto.search"
        className="w-full my-3"
        name="inputSearch"
        placeholder="Recherche ..."
        onDebouncedChange={onSearchKeywordChange}
      />

      <TagsFilter tags={response.data} onChange={onTagChange} />
    </div>
  );
};
