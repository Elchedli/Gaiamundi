import { FC } from 'react';

import { ChartConfigProvider } from 'hooks/useChartConfig';
import { DEFAULT_CHART_DATA } from 'utils/constants';
import { Canvas } from './Canvas/Canvas';
import { ConfigPanel } from './ChartConfig/ConfigPanel';

type ChartEngineProps = {
  chartId: number;
};

export const ChartEngine: FC<ChartEngineProps> = ({ chartId }) => {
  return (
    <ChartConfigProvider chartId={chartId} rawData={DEFAULT_CHART_DATA}>
      <div className="flex flex-row">
        <div className="w-1/4">
          <ConfigPanel />
        </div>
        <div className="w-3/4">
          <Canvas />
        </div>
      </div>
    </ChartConfigProvider>
  );
};
