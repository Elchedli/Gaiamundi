import { useState } from 'react';
import { useQuery } from 'react-query';

import { Alert } from 'components/Alert/Alert';
import { ApiErrorAlert } from 'components/Alert/ApiErrorMessage';
import { LoadingMessage } from 'components/Loader/LoadingMessage';
import { FilterBar } from 'components/PageCarto/Dashboard/FilterBar';
import { PageCartoUserList } from 'components/PageCarto/Dashboard/PageCartoUserList';
import { useAuth } from 'hooks/useAuth';
import { ApiError } from 'interfaces/api';
import { getAllTagsByOwner } from 'services/tag';

export const Dashboard: React.FC = () => {
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

  const [inputName, setInputName] = useState('');
  const [tagsSelected, setTagsSelected] = useState<number[]>([]);

  const safeChangeSearchInput = (name: string) => setInputName(name);
  const safeChangeTags = (tagsTable: number[]) => setTagsSelected(tagsTable);

  if (isLoading) {
    return <LoadingMessage />;
  }

  if (isError) {
    return <ApiErrorAlert error={error as ApiError} />;
  }

  if (!response || response.data.length === 0) {
    return (
      <Alert type="info" className="grid h-fit justify-center items-center">
        <div data-testid="error-message">Aucun tag na été trouvé!.</div>
      </Alert>
    );
  }
  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="col-span-1">
        <FilterBar
          tags={response.data}
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
