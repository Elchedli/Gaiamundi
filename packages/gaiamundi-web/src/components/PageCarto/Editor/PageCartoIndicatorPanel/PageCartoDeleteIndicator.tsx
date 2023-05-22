import { ApiErrorAlert } from 'components/Alert/ApiErrorMessage';
import { Button } from 'components/Button/Button';
import { useToast } from 'hooks/useToast';
import { ApiData, ApiError } from 'interfaces/api';
import { IndicatorStub } from 'interfaces/indicator';
import { FC } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { deleteIndicatorToPageCarto } from 'services/indicator';

type DeleteIndicatorProps = {
  indicator: ApiData<IndicatorStub>;
  pageCartoId: number;
  onSubmit: (indicatorId: number) => void;
};
export const PageCartoDeleteIndicator: FC<DeleteIndicatorProps> = ({
  indicator,
  pageCartoId,
  onSubmit,
}) => {
  const { addToast } = useToast();
  const queryClient = useQueryClient();
  const { isError, error, mutateAsync, isLoading } = useMutation({
    mutationFn: async (indicatorId: number) => {
      return await deleteIndicatorToPageCarto(indicatorId);
    },
    onSuccess: (_response, indicatorId: number) => {
      addToast({
        title: 'indicateur supprimé',
        description: 'indicateur supprimé avec succès',
        type: 'success',
      });
      queryClient.invalidateQueries(['page-carto', pageCartoId]);
      onSubmit(indicatorId);
    },
  });
  const onSubmitDelete = async () => {
    mutateAsync(indicator.id);
  };
  return (
    <div className="p-3">
      {isError && <ApiErrorAlert error={error as ApiError} />}
      <div className="h-full w-full">
        <h4 className="text-center mt-2 text-2xl uppercase mb-4">
          Vous êtes sur le point de supprimer l&apos; indicateur numéro{' '}
          {indicator.id}
        </h4>
        <div className="flex flex-col">
          <span className="text-center text-lg mb-4 text-red-600">
            Pour valider la suppression de l&apos;indicateur veuillez cliquer
            sur <strong className="italic">oui je confirme</strong>
          </span>
          <span className="text-center italic text-sm text-red-700">
            Une fois supprimé, les données seront perdues de manière permanente
            et il ne sera pas possible de les récupérer.
          </span>
        </div>
        <div className="flex justify-center mt-6">
          <Button
            data-testid="submit-button-delete"
            onClick={onSubmitDelete}
            size="lg"
            isLoading={isLoading}
          >
            oui je confirme
          </Button>
        </div>
      </div>
    </div>
  );
};
