import { CheckCircleIcon, PlusIcon } from '@heroicons/react/24/solid';
import { Button } from 'components/Button/Button';
import { useChart } from 'hooks/useChartConfig';
import { useModal } from 'hooks/useModal';
import { useToast } from 'hooks/useToast';
import { useMutation, useQueryClient } from 'react-query';
import { createChart, updateChart } from 'services/chart';

export const ChartActionButtons = ({ updateMode }: { updateMode: boolean }) => {
  const queryClient = useQueryClient();
  const { hideModal } = useModal();
  const { chart, pageCartoId } = useChart();
  const { addToast } = useToast();

  const { mutateAsync: saveChart, isLoading } = useMutation({
    mutationFn: async () => {
      const { id, ...updates } = chart;
      return await updateChart(id, updates);
    },
    onSuccess: () => {
      hideModal();
      addToast({
        title: `Mise à jour`,
        type: 'success',
        description: `Le graphique a été mis à jour avec succès`,
      });
      queryClient.invalidateQueries({
        queryKey: ['page-carto', pageCartoId],
      });
    },
    onError: (error) => {
      addToast({
        title: 'Echec lors de la sauvegarde du graphique',
        type: 'error',
        description: JSON.stringify(error),
      });
    },
  });

  const { mutateAsync: addChart, isLoading: loading } = useMutation({
    mutationFn: async () => {
      const { id, ...updates } = chart;

      return await createChart(updates);
    },
    onSuccess: () => {
      hideModal();
      addToast({
        title: `Creation`,
        type: 'success',
        description: `Le graphique a été créé avec succès`,
      });
      queryClient.invalidateQueries({
        queryKey: ['page-carto', pageCartoId],
      });
    },
    onError: (error) => {
      addToast({
        title: 'Echec lors de la creation du graphique',
        type: 'error',
        description: JSON.stringify(error),
      });
    },
  });

  return (
    <div className="relative">
      {updateMode ? (
        <Button
          isLoading={isLoading}
          icon={CheckCircleIcon}
          onClick={() => saveChart()}
          disabled={isLoading}
        >
          Sauvegarder
        </Button>
      ) : (
        <Button
          isLoading={loading}
          icon={PlusIcon}
          onClick={() => addChart()}
          disabled={loading}
        >
          Ajouter
        </Button>
      )}
    </div>
  );
};
