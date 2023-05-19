import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/solid';
import { Alert } from 'components/Alert/Alert';
import { Button } from 'components/Button/Button';
import ButtonGroup from 'components/Button/ButtonGroup';
import { Chart } from 'components/ChartEngine/Chart/Chart';
import { ChartEngine } from 'components/ChartEngine/ChartEngine';
import { ListBoxInput } from 'components/Inputs/ListBoxInput';
import config from 'config';
import { ChartConfigProvider } from 'hooks/useChartConfig';
import { useModal } from 'hooks/useModal';
import { usePageCarto } from 'hooks/usePageCarto';
import { useToast } from 'hooks/useToast';
import { useMemo, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { deleteChart } from 'services/chart';
import { DEFAULT_CHART_DATA } from 'utils/constants';

export const PageCartoChartPanel = () => {
  const { showModal, hideModal } = useModal();
  const [selectedChartId, setSelectedChartId] = useState(0);

  const { pageCartoId, charts } = usePageCarto();
  const { addToast } = useToast();
  const queryClient = useQueryClient();
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

  return (
    <div className="w-full h-full p-2">
      <div className="rounded-lg border border-blue-700 h-5/6 overflow-y-auto p-1">
        {charts.length > 0 ? (
          <div className="h-full">
            <div className="flex">
              <p className="text-slate-950 text-xl px-3 py-1">Graphiques</p>

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
                <ButtonGroup>
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
                          updateMode: true,
                          onClose: onClose,
                        },
                      })
                    }
                  />
                  <Button
                    icon={TrashIcon}
                    data-testid="discard-chart"
                    onClick={() =>
                      showModal({
                        title: 'Supprimer graphique',
                        Component: () => (
                          <Alert type="warning" onDismiss={hideModal}>
                            <div data-testid="delete-chart-modal">
                              <div className="mb-6">
                                Êtes-vous sûr de vouloir supprimer cette
                                graphique ?
                              </div>
                              <div className="mb-2">
                                <Button
                                  data-testid="confirmDelete"
                                  color="red"
                                  className="mr-2"
                                  onClick={() => {
                                    discardChart();
                                    hideModal();
                                  }}
                                >
                                  Supprimer
                                </Button>
                                <Button type="button" onClick={hideModal}>
                                  Annuler
                                </Button>
                              </div>
                            </div>
                          </Alert>
                        ),
                        props: {
                          onSubmit: hideModal,
                        },
                      })
                    }
                    disabled={isLoading}
                  />
                </ButtonGroup>
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
          <>
            <p className="text-slate-950 text-xl px-5 ">Graphiques</p>
            <div
              className="flex justify-center h-5/6"
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
          </>
        )}
      </div>
    </div>
  );
};
