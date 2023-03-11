import { FC } from 'react';
import { PageCartoMap } from './PageCartoMap';
import { PageCartoPanels } from './PageCartoPanels';

export const PageCartoEditor: FC = () => {
  return (
    <div className="grid grid-cols-3 gap-4 h-full">
      <div className="col-span-2">
        <PageCartoMap />
      </div>
      <div className="col-span">
        <PageCartoPanels />
      </div>
    </div>
  );
};
