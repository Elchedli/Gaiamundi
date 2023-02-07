import { useParams } from 'react-router-dom';
import { PageCartoEditor } from 'components/PageCarto/PageCartoEditor';
import { useQuery } from 'react-query';
import { getPageCartoById } from 'services/page-carto';
import { LoadingMessage } from 'components/Loader/LoadingMessage';
import { ApiErrorAlert } from 'components/Alert/ApiErrorMessage';
import { ApiError } from 'interfaces/api';
import { Alert } from 'components/Alert/Alert';

export const PageCartoEditPage: React.FC = () => {
  const { id } = useParams();
  const {
    data: response,
    isError,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['page-carto', id],
    queryFn: async () => {
      return await getPageCartoById(parseInt(id || ''));
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
