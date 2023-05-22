import { FC } from 'react';

import { ChartConfigProvider } from 'hooks/useChartConfig';
import { DataProvider } from 'hooks/useData';
import { PageCartoProvider } from 'hooks/usePageCarto';
import { Canvas } from './Canvas/Canvas';
import { ConfigPanel } from './ChartConfig/ConfigPanel';

type ChartEngineProps = {
  chartId: number;
  pageCartoId: number;
  selectedGeoCode: string | null;
};

export const ChartEngine: FC<ChartEngineProps> = ({
  chartId,
  pageCartoId,
  selectedGeoCode,
}) => {
  return (
    <PageCartoProvider id={pageCartoId}>
      <DataProvider
        pageCartoId={pageCartoId}
        geoCodeSelection={selectedGeoCode}
      >
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
      </DataProvider>
    </PageCartoProvider>
  );
};
