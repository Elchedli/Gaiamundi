import { ArrowPathIcon as RefreshIcon } from '@heroicons/react/24/solid';
import React from 'react';

import { Button } from 'components/Button/Button';
import { ContentEditable } from 'components/ContentEditable/ContentEditable';
import Well from 'components/Layout/Well';
import { ResponsiveChartContainer } from 'eazychart-react';
import { useChart } from 'hooks/useChartConfig';
import { useModal } from 'hooks/useModal';
import { ChartType } from 'interfaces/chart';
import { ChartActionButtons } from './ChartActionButtons';
import { ChartTypeSelector } from './ChartTypeSelector';
import { Legend } from './Legend';

export const Canvas = () => {
  const { chart, updateChart, ChartComponent, rawData, setDimensions } =
    useChart();
  const { showModal, hideModal } = useModal();

  const isLegendEnabled = React.useMemo(
    () => ['scatter', 'line', 'bubble', 'area'].indexOf(chart.type) === -1,
    [chart.type]
  );

  const switchChartType = (type: ChartType) => {
    updateChart({ ...chart, type });
    hideModal();
  };

  const showChartTypes = () => {
    showModal({
      title: 'Select Chart Type',
      Component: ChartTypeSelector,
      props: {
        onSelect: switchChartType,
      },
    });
  };

  const onChange = (name: string) => {
    updateChart({
      ...chart,
      name,
    });
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
        <Button
          icon={RefreshIcon}
          color="alternative"
          className="absolute z-0 top-8 right-8"
          onClick={showChartTypes}
          outline={true}
        >
          Switch Chart Type
        </Button>
        <ResponsiveChartContainer onResize={setDimensions}>
          <ChartComponent
            rawData={rawData}
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
