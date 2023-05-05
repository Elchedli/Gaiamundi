import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/solid';
import { Button } from 'components/Button/Button';
import { Chart } from 'components/ChartEngine/Chart/Chart';
import { ChartEngine } from 'components/ChartEngine/ChartEngine';
import { ListBoxInput } from 'components/Inputs/ListBoxInput';
import config from 'config';
import { ChartConfigProvider } from 'hooks/useChartConfig';
import { useModal } from 'hooks/useModal';
import { usePageCarto } from 'hooks/usePageCarto';
import { useToast } from 'hooks/useToast';
import { FC, useMemo, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { deleteChart } from 'services/chart';
import { DEFAULT_CHART_DATA } from 'utils/constants';

export const PageCartoChartPanel: FC = () => {
  const { showModal, hideModal } = useModal();
  const { pageCartoId } = usePageCarto();
  const { charts } = usePageCarto();
  const { addToast } = useToast();
  const queryClient = useQueryClient();
  const [selectedChartId, setSelectedChartId] = useState(0);

  const chartOptions = useMemo(() => {
    if (charts.length > 0 && selectedChartId == 0) {
      setSelectedChartId(charts[0].id);
    }

    return charts.map(({ id, name }) => ({
      value: id,
      label: name,
    })) as Array<{ value: number; label: string }>;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [charts]);

  const { mutateAsync: discardChart, isLoading } = useMutation({
    mutationFn: async () => {
      return await deleteChart(selectedChartId);
    },
    onSuccess: () => {
      addToast({
        title: `Mise à jour`,
        type: 'success',
        description: `Le graphique a été supprimé avec succès`,
      });
      setSelectedChartId(0);
      queryClient.invalidateQueries({
        queryKey: ['page-carto', pageCartoId],
      });
    },
    onError: (error) => {
      addToast({
        title: 'Echec lors de la suppression du graphique',
        type: 'error',
        description: JSON.stringify(error),
      });
    },
  });

  return (
    <>
      {charts.length > 0 ? (
        <div className="h-full">
          <div className="flex">
            <div className="w-6/12">
              <ListBoxInput<number>
                defaultValue={selectedChartId}
                options={chartOptions}
                onChange={(chartId: number) => {
                  setSelectedChartId(chartId);
                }}
              />
            </div>
            <div className="w-6/12 text-center">
              <Button
                icon={PlusIcon}
                data-testid="create-chart2"
                onClick={() =>
                  showModal({
                    title: 'Nouveau graphique',
                    Component: ChartEngine,
                    props: {
                      chartId: 0,
                      pageCartoId,
                      onSubmit: hideModal,
                      updateMode: false,
                    },
                  })
                }
                className="mx-1"
              />
              <Button
                icon={PencilIcon}
                data-testid="edit-chart"
                onClick={() =>
                  showModal({
                    title: 'Nouveau graphique',
                    Component: ChartEngine,
                    props: {
                      chartId: selectedChartId,
                      pageCartoId,
                      onSubmit: hideModal,
                      updateMode: true,
                    },
                  })
                }
                className="mx-1"
              />
              <Button
                icon={TrashIcon}
                data-testid="discard-chart"
                onClick={() => discardChart()}
                disabled={isLoading}
                className="mx-1"
              />
            </div>
          </div>
          <ChartConfigProvider
            chartId={selectedChartId}
            rawData={DEFAULT_CHART_DATA}
            pageCartoId={pageCartoId}
          >
            <Chart />
          </ChartConfigProvider>
        </div>
      ) : (
        <div
          className="flex justify-center h-full"
          style={{
            backgroundImage: `url(${config.PUBLIC_URL}/icons/chart-fr.svg)`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
        >
          <Button
            icon={PlusIcon}
            data-testid="create-chart"
            onClick={() =>
              showModal({
                title: 'Nouveau graphique',
                Component: ChartEngine,
                props: { pageCartoId, onSubmit: hideModal },
              })
            }
            className="m-auto"
          >
            Nouveau graphique
          </Button>
        </div>
      )}
    </>
  );
};
