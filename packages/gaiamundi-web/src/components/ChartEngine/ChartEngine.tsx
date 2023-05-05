import { FC } from 'react';

import { ChartConfigProvider } from 'hooks/useChartConfig';
import { DEFAULT_CHART_DATA } from 'utils/constants';
import { Canvas } from './Canvas/Canvas';
import { ConfigPanel } from './ChartConfig/ConfigPanel';

type ChartEngineProps = {
  chartId: number;
  pageCartoId?: number;
  updateMode: boolean;
};

export const ChartEngine: FC<ChartEngineProps> = ({
  chartId,
  pageCartoId,
  updateMode,
}) => {
  return (
    <ChartConfigProvider
      chartId={chartId}
      rawData={DEFAULT_CHART_DATA}
      pageCartoId={pageCartoId}
    >
      <div className="flex flex-row">
        <div className="w-1/4">
          <ConfigPanel />
        </div>
        <div className="w-3/4">
          <Canvas updateMode={updateMode} />
        </div>
      </div>
    </ChartConfigProvider>
  );
};
