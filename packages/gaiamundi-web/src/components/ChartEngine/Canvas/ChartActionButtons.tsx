import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { Button } from 'components/Button/Button';
import { useChartConfig } from 'hooks/useChartConfig';
import { useModal } from 'hooks/useModal';
import { useToast } from 'hooks/useToast';
import { useMutation, useQueryClient } from 'react-query';
import { createChart, updateChart } from 'services/chart';

export const ChartActionButtons = () => {
  const queryClient = useQueryClient();
  const { hideModal } = useModal();
  const { chart, pageCartoId } = useChartConfig();
  const { addToast } = useToast();

  const { mutateAsync: submitChart, isLoading } = useMutation({
    mutationFn: async () => {
      const { id, ...rest } = chart;
      return id ? await updateChart(id, rest) : await createChart(rest);
    },
    onSuccess: () => {
      hideModal();
      addToast({
        title: `Graphique`,
        type: 'success',
        description: `Le graphique a été sauvegardé avec succès`,
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

  return (
    <div className="relative">
      <Button
        isLoading={isLoading}
        icon={CheckCircleIcon}
        onClick={() => submitChart()}
        disabled={isLoading}
        size="sm"
      >
        Valider
      </Button>
    </div>
  );
};
