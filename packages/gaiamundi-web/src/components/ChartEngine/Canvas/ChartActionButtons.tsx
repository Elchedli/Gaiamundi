import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { Button } from 'components/Button/Button';
import ButtonGroup from 'components/Button/ButtonGroup';
import { useChart } from 'hooks/useChartConfig';
import { useToast } from 'hooks/useToast';
import { useMutation } from 'react-query';
import { updateChart } from 'services/chart';

export const ChartActionButtons = () => {
  const { chart } = useChart();
  const { addToast } = useToast();

  const { mutateAsync: saveChart, isLoading } = useMutation({
    mutationFn: async () => {
      const { id, ...updates } = chart;
      return await updateChart(id, updates);
    },
    onSuccess: () => {
      addToast({
        title: `Mise à jour`,
        type: 'success',
        description: `Le graphique a été mis à jour avec succès`,
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
      <ButtonGroup>
        <Button
          isLoading={isLoading}
          icon={CheckCircleIcon}
          onClick={() => saveChart()}
          disabled={isLoading}
        >
          Save
        </Button>
      </ButtonGroup>
    </div>
  );
};
