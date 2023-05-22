import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';
import { ApiErrorAlert } from 'components/Alert/ApiErrorMessage';
import { Badge } from 'components/Badge/Badge';
import { LoadingMessage } from 'components/Loader/LoadingMessage';
import config from 'config';
import excerptHtml from 'excerpt-html';
import { useAuth } from 'hooks/useAuth';
import { useConfirmModal } from 'hooks/useModal';
import { useToast } from 'hooks/useToast';
import { ApiData, ApiError } from 'interfaces/api';
import { UploadedFile } from 'interfaces/file';
import { PageCarto } from 'interfaces/page-carto';
import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';
import { deletePageCarto } from 'services/page-carto';

const getThumbnailUrl = (cover: ApiData<UploadedFile>) => {
  const imgUrl = cover?.formats['thumbnail'].url;
  return imgUrl
    ? `${config.API_URL}${imgUrl}`
    : `${config.PUBLIC_URL}/imageplaceholder.png`;
};

const PageCartoItem: React.FC<ApiData<PageCarto>> = ({
  id,
  name,
  owner,
  tags,
  map,
  cover,
  html,
}) => {
  const [canEditOrDelete, setCanEditOrDelete] = useState(false);
  const { user } = useAuth();
  const { addToast } = useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (owner.id === user?.id) {
      setCanEditOrDelete(true);
    } else {
      setCanEditOrDelete(false);
    }
  }, [owner.id, user]);

  const {
    mutateAsync: deletePageCartoItem,
    isLoading,
    isError,
    error,
  } = useMutation({
    mutationFn: async (id: number) => {
      return await deletePageCarto(id);
    },
    onSuccess: () => {
      addToast({
        title: `PageCarto ${name} supprimée`,
        description: 'PageCarto supprimée avec succès',
        type: 'success',
      });
      queryClient.invalidateQueries({
        queryKey: ['latest-page-carto'],
      });
      queryClient.invalidateQueries({ queryKey: ['page-carto-user'] });
    },
  });

  const { showConfirmModal } = useConfirmModal(
    'Confirmation',
    'Êtes-vous sûr de vouloir supprimer cette PageCarto ?',
    async () => await deletePageCartoItem(id)
  );

  if (isLoading) {
    return <LoadingMessage data-testid="loading-message" />;
  }

  if (isError) {
    return (
      <ApiErrorAlert error={error as ApiError} data-testid="error-message" />
    );
  }

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <Link to={`/page-carto/${id}`}>
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-400 xl:aspect-w-7 xl:aspect-h-8 relative">
          <img
            src={getThumbnailUrl(cover)}
            className="h-48 w-full object-cover group-hover:opacity-75"
          />
          {canEditOrDelete === true ? (
            <>
              <Link to={`/page-carto/${id}/edit`}>
                <PencilSquareIcon
                  className="cursor-pointer shadow-md shadow-gray-800 p-1 text-blue-600 opacity-75 h-7 w-7 bg-white rounded-md text-center absolute bottom-2 right-2 hover:scale-125 transition-transform duration-200"
                  data-testid="editIcon"
                />
              </Link>
              <Link to={'#'}>
                <TrashIcon
                  onClick={showConfirmModal}
                  className="cursor-pointer p-1 shadow-md shadow-gray-800 text-blue-600 h-7 w-7 opacity-75 bg-white rounded-md text-center absolute bottom-2 right-12 hover:scale-125 transition-transform duration-200"
                  data-testid="deleteIcon"
                />
              </Link>
            </>
          ) : (
            ''
          )}
        </div>
        <div className="p-3">
          <h2>{name}</h2>
          <div className="text-gray-500">
            <div className="text-sm my-1">
              <div className="my-1 font-bold">Carte : {map.name}</div>
              <p>{html && excerptHtml(html)}</p>
              <div className="text-xs mt-2">Créer par : {owner.username}</div>
            </div>
            <div className="mt-3">
              {tags.map((tag, index) => {
                return (
                  <Badge className="inline-block" key={index}>
                    {tag.name}
                  </Badge>
                );
              })}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PageCartoItem;
