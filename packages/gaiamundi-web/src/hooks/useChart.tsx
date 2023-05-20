import { CHART_TYPES } from 'interfaces/chart';
import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { getChartById } from 'services/chart';

export const useChart = (chartId: number) => {
  const query = useQuery({
    queryKey: ['chart', chartId],
    queryFn: async () => await getChartById(chartId),
    enabled: !!chartId,
  });
  const chart = query.data?.data;
  const ChartComponent = useMemo(() => {
    return chart?.type
      ? CHART_TYPES[chart.type].ChartComponent
      : CHART_TYPES.column.ChartComponent;
  }, [chart]);

  return {
    ...query,
    ChartComponent,
  };
};
