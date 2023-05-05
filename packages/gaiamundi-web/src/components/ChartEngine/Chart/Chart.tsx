import React from 'react';

import { ResponsiveChartContainer } from 'eazychart-react';
import { useChart } from 'hooks/useChartConfig';
import { Legend } from '../Canvas/Legend';

export const Chart = () => {
  const { chart, ChartComponent, rawData, setDimensions } = useChart();

  const isLegendEnabled = React.useMemo(
    () => ['scatter', 'line', 'bubble', 'area'].indexOf(chart.type) === -1,
    [chart.type]
  );

  return (
    <div className="relative h-5/6 w-full">
      <ResponsiveChartContainer onResize={setDimensions}>
        <ChartComponent
          data={rawData}
          scopedSlots={{
            LegendComponent: isLegendEnabled && Legend,
          }}
          {...chart.props}
        />
      </ResponsiveChartContainer>
    </div>
  );
};
