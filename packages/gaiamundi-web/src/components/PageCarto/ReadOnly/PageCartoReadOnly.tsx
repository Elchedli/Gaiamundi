import { FC } from 'react';
import { PageCartoChartPanel } from '../Editor/PageCartoChartPanel/PageCartoChartPanel';
import { PageCartoMap } from '../Editor/PageCartoMap';
import { PageCartoContent } from './PageCartoContent';

export const PageCartoReadOnly: FC = () => {
  return (
    <div className="grid grid-cols-3 h-full grid-rows-2">
      <div className="col-span-2 row-span-2 p-2">
        <PageCartoMap canEdit={false} />
      </div>
      <div className="col-span row-span-1 p-2">
        <PageCartoContent />
      </div>
      <div className="col-span row-span-1 p-2">
        <PageCartoChartPanel />
      </div>
    </div>
  );
};
