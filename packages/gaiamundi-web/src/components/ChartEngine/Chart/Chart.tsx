import { Alert } from 'components/Alert/Alert';
import { LoadingMessage } from 'components/Loader/LoadingMessage';
import { ResponsiveChartContainer } from 'eazychart-react';
import { useChart } from 'hooks/useChart';
import { useDataset } from 'hooks/useDataset';
import { FC } from 'react';

export const Chart: FC<{ chartId: number }> = ({ chartId }) => {
  const { data, isLoading, error, ChartComponent } = useChart(chartId);
  const { rawData } = useDataset();

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
        <ChartComponent data={rawData} {...chart.props} />
      </ResponsiveChartContainer>
    </div>
  );
};
