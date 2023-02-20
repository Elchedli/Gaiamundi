import { Alert } from 'components/Alert/Alert';
import { ApiErrorAlert } from 'components/Alert/ApiErrorMessage';
import { LoadingMessage } from 'components/Loader/LoadingMessage';
import { PageCartoEditor } from 'components/PageCarto/Editor/PageCartoEditor';
import { ApiError } from 'interfaces/api';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getPageCartoById } from 'services/page-carto';

export const PageCartoEditPage: React.FC = () => {
  const params = useParams();
  const id = parseInt(params.id || '');
  const {
    data: response,
    isError,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['page-carto', id],
    queryFn: async () => {
      return await getPageCartoById(id);
    },
    keepPreviousData: true,
    // The query will not execute until the userId exists
    enabled: !!id,
  });

  if (isLoading) {
    return <LoadingMessage />;
  }

  if (isError) {
    return <ApiErrorAlert error={error as ApiError} />;
  }

  if (!response) {
    return <Alert type="info">Aucun contenu à afficher.</Alert>;
  }

  return (
    <div className="h-full w-full">
      <PageCartoEditor pageCarto={response.data} />
    </div>
  );
};
