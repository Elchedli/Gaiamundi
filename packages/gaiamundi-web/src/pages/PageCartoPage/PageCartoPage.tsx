import { Alert } from 'components/Alert/Alert';
import { ApiErrorAlert } from 'components/Alert/ApiErrorMessage';
import { LoadingMessage } from 'components/Loader/LoadingMessage';
import { PageCartoEditor } from 'components/PageCarto/Editor/PageCartoEditor';
import { usePageCarto } from 'hooks/usePageCarto';
import { ApiError } from 'interfaces/api';

export const PageCartoEditPage: React.FC = () => {
  const { isError, error, isLoading, data } = usePageCarto();

  if (isLoading) {
    return <LoadingMessage />;
  }

  if (isError) {
    return <ApiErrorAlert error={error as ApiError} />;
  }

  if (!data) {
    return <Alert type="info">Aucun contenu à afficher.</Alert>;
  }

  return (
    <div className="h-full w-full">
      <PageCartoEditor />
    </div>
  );
};
