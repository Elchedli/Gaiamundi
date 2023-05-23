import { ContentEditable } from 'components/ContentEditable/ContentEditable';
import Well from 'components/Layout/Well';
import { ResponsiveChartContainer } from 'eazychart-react';
import { useChartConfig } from 'hooks/useChartConfig';
import { useData } from 'hooks/useData';
import { ChartType } from 'interfaces/chart';
import { ChartActionButtons } from './ChartActionButtons';
import { ChartTypeSelector } from './ChartTypeSelector';

export const Canvas = () => {
  const { chart, updateChart, ChartComponent, setDimensions } =
    useChartConfig();
  const { selectedData: chartData } = useData();

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
      <div className="relative overflow-hidden">
        <ChartTypeSelector onSelect={switchChartType} />
        <ResponsiveChartContainer onResize={setDimensions}>
          <ChartComponent
            data={chartData}
            {...chart.props}
            scopedSlots={{
              LegendComponent: () => null,
            }}
          />
        </ResponsiveChartContainer>
      </div>
    </Well>
  );
};
