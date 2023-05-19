import { ChartConfigProvider } from 'hooks/useChartConfig';
import { usePageCarto } from 'hooks/usePageCarto';
import { FC, useState } from 'react';
import { DEFAULT_CHART_DATA } from 'utils/constants';
import { PageCartoMap } from './PageCartoMap';
import { PageCartoPanels } from './PageCartoPanels';
import { PageCartoChartPanel } from './PgeCartoChartPanel/PageCartoChartPanel';

export const PageCartoEditor: FC = () => {
  const { pageCartoId } = usePageCarto();
  const [selectedChartId, setSelectedChartId] = useState(0);

  return (
    <div className="grid grid-cols-3 gap-4 h-full grid-rows-2">
      <div className="col-span-2 row-span-2">
        <PageCartoMap />
      </div>
      <div className="col-span rowspan-1">
        <PageCartoPanels />
      </div>
      <div className="col-span rowspan-1 h-full">
        <ChartConfigProvider
          chartId={selectedChartId}
          rawData={DEFAULT_CHART_DATA}
          pageCartoId={pageCartoId}
        >
          <PageCartoChartPanel setSelectedChartId={setSelectedChartId} />
        </ChartConfigProvider>
      </div>
    </div>
  );
};
