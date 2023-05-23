import { FC } from 'react';
import { PageCartoChartPanel } from './PageCartoChartPanel/PageCartoChartPanel';
import { PageCartoMap } from './PageCartoMap';
import { PageCartoPanels } from './PageCartoPanels';

export const PageCartoEditor: FC = () => {
  return (
    <div className="grid grid-cols-3 h-full grid-rows-2">
      <div className="col-span-2 row-span-2 p-2">
        <PageCartoMap canEdit={true} />
      </div>
      <div className="col-span row-span-1 p-2">
        <PageCartoPanels />
      </div>
      <div className="col-span row-span-1 p-2">
        <PageCartoChartPanel />
      </div>
    </div>
  );
};
