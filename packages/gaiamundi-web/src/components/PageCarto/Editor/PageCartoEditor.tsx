import { FC } from 'react';
import { PageCartoChartPanel } from './PageCartoChartPanel/PageCartoChartPanel';
import { PageCartoMap } from './PageCartoMap';
import { PageCartoPanels } from './PageCartoPanels';

export const PageCartoEditor: FC = () => {
  return (
    <div className="grid grid-cols-3 gap-4 h-full">
      <div className="col-span-2">
        <PageCartoMap canEdit={true} />
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
