import { FC } from 'react';
import { PageCartoMap } from './PageCartoMap';
import { PageCartoPanels } from './PageCartoPanels';
import { PageCartoChartPanel } from './PgeCartoChartPanel/PageCartoChartPanel';

export const PageCartoEditor: FC = () => {
  return (
    <div className="grid grid-cols-3 gap-4 h-full grid-rows-2">
      <div className="col-span-2 row-span-2">
        <PageCartoMap />
      </div>
      <div className="col-span rowspan-1">
        <PageCartoPanels />
      </div>
      <div className="col-span rowspan-1 h-full">
        <PageCartoChartPanel />
      </div>
    </div>
  );
};
