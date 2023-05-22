import { Alert } from 'components/Alert/Alert';
import { LoadingMessage } from 'components/Loader/LoadingMessage';
import { ResponsiveChartContainer } from 'eazychart-react';
import { useChart } from 'hooks/useChart';
import { useData } from 'hooks/useData';
import { FC } from 'react';

export const Chart: FC<{ chartId: number }> = ({ chartId }) => {
  const { data, isLoading, error, ChartComponent } = useChart(chartId);
  const { rawData } = useData();

  if (error) {
    return <Alert>Impossible de charger le graphique</Alert>;
  }
  const chart = data?.data;

  if (isLoading || !chart) {
    return <LoadingMessage />;
  }

  return (
    <div className="relative h-5/6 w-full p-2">
      <ResponsiveChartContainer>
        <ChartComponent
          data={rawData}
          {...chart.props}
          scopedSlots={{
            LegendComponent: () => null,
            TooltipComponent: undefined,
          }}
        />
      </ResponsiveChartContainer>
    </div>
  );
};
