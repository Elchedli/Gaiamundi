import React from 'react';

import { ContentEditable } from 'components/ContentEditable/ContentEditable';
import Well from 'components/Layout/Well';
import { ResponsiveChartContainer } from 'eazychart-react';
import { useChart } from 'hooks/useChartConfig';
import { ChartType } from 'interfaces/chart';
import { ChartActionButtons } from './ChartActionButtons';
import { ChartTypeSelector } from './ChartTypeSelector';
import { Legend } from './Legend';

export const Canvas = () => {
  const { chart, updateChart, ChartComponent, rawData, setDimensions } =
    useChart();

  const isLegendEnabled = React.useMemo(
    () => ['scatter', 'line', 'bubble', 'area'].indexOf(chart.type) === -1,
    [chart.type]
  );

  const switchChartType = (type: ChartType) => {
    updateChart({ type });
  };

  const onChange = (name: string) => {
    updateChart({ name });
  };

  return (
    <Well>
      <div>
        <div className="flex flex-row justify-between">
          <div className="flex flex-row">
            <ContentEditable
              value={chart.name}
              onInput={(e) => onChange(e.currentTarget.innerText)}
              onBlur={() => {
                /** noop **/
              }}
              isLoading={false}
            />
          </div>
          <ChartActionButtons />
        </div>
        <hr className="border-1 border-gray-100 mt-4" />
      </div>
      <div className="mt-10 relative">
        <ChartTypeSelector onSelect={switchChartType} />
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
    </Well>
  );
};
