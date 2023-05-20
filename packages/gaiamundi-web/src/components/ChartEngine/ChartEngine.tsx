import { FC } from 'react';

import { ChartConfigProvider } from 'hooks/useChartConfig';
import { DatasetProvider } from 'hooks/useDataset';
import { Canvas } from './Canvas/Canvas';
import { ConfigPanel } from './ChartConfig/ConfigPanel';

type ChartEngineProps = {
  chartId: number;
  pageCartoId: number;
};

export const ChartEngine: FC<ChartEngineProps> = ({ chartId, pageCartoId }) => {
  return (
    <DatasetProvider pageCartoId={pageCartoId}>
      <ChartConfigProvider chartId={chartId} pageCartoId={pageCartoId}>
        <div className="flex flex-row">
          <div className="w-2/6">
            <ConfigPanel />
          </div>
          <div className="w-4/6">
            <Canvas />
          </div>
        </div>
      </ChartConfigProvider>
    </DatasetProvider>
  );
};
