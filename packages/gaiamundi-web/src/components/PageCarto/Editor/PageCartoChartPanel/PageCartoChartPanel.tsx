import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/solid';
import { Button } from 'components/Button/Button';
import ButtonGroup from 'components/Button/ButtonGroup';
import { Chart } from 'components/ChartEngine/Chart/Chart';
import { ChartEngine } from 'components/ChartEngine/ChartEngine';
import { ListBoxInput } from 'components/Inputs/ListBoxInput';
import config from 'config';
import { useConfirmModal, useModal } from 'hooks/useModal';
import { usePageCarto } from 'hooks/usePageCarto';
import { useToast } from 'hooks/useToast';
import { useMemo, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { deleteChart } from 'services/chart';

export const PageCartoChartPanel = () => {
  const { showModal, hideModal } = useModal();

  const { pageCartoId, charts } = usePageCarto();
  const [selectedChartId, setSelectedChartId] = useState(
    charts.length ? charts[0].id : 0
  );
  const { addToast } = useToast();
  const queryClient = useQueryClient();

  const chartOptions = useMemo(() => {
    return charts.map(({ id, name }) => ({
      value: id,
      label: name,
    })) as Array<{ value: number; label: string }>;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [charts]);

  const onClose = () => {
    queryClient.invalidateQueries({
      queryKey: ['chart'],
    });
  };

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

  const { showConfirmModal } = useConfirmModal(
    'Supprimer graphique',
    'Êtes-vous sûr de vouloir supprimer cette graphique?',
    discardChart
  );

  return (
    <div className="w-full h-full p-2">
      <div className="rounded-lg border border-blue-700 h-5/6 overflow-y-auto p-2">
        {charts.length > 0 ? (
          <div className="h-full">
            <div className="flex justify-between">
              <h2 className="text-slate-950 text-xl pl-2 py-1">Graphique</h2>
              <div className="flex items-center	">
                <ListBoxInput<number>
                  defaultValue={selectedChartId}
                  options={chartOptions}
                  onChange={(chartId: number) => {
                    setSelectedChartId(chartId);
                  }}
                />
                <ButtonGroup className="ml-2">
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
                        },
                      })
                    }
                    size={'sm'}
                  />
                  <Button
                    icon={PencilIcon}
                    data-testid="edit-chart"
                    onClick={() =>
                      showModal({
                        title: 'Modifier graphique',
                        Component: ChartEngine,
                        props: {
                          chartId: selectedChartId,
                          pageCartoId,
                          onSubmit: hideModal,
                          onClose: onClose,
                        },
                      })
                    }
                    size={'sm'}
                  />
                  <Button
                    icon={TrashIcon}
                    data-testid="discard-chart"
                    onClick={showConfirmModal}
                    disabled={isLoading}
                    size={'sm'}
                  />
                </ButtonGroup>
              </div>
            </div>
            <Chart chartId={selectedChartId} />
          </div>
        ) : (
          <>
            <h2 className="text-slate-950 text-xl px-5 ">Graphiques</h2>
            <div
              className="flex justify-center h-5/6"
              style={{
                backgroundImage: `url(${config.PUBLIC_URL}/icons/chart-placeholder.svg)`,
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
          </>
        )}
      </div>
    </div>
  );
};
