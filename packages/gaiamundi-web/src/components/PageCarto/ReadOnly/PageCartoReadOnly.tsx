import { FC } from 'react';
import { PageCartoMap } from '../Editor/PageCartoMap';
import { PageCartoPanels } from '../Editor/PageCartoPanels';

export const PageCartoReadOnly: FC = () => {
  return (
    <div className="grid grid-cols-3 gap-4 h-full">
      <div className="col-span-2">
        <PageCartoMap canEdit={false} />
      </div>
      <div className="col-span">
        <PageCartoPanels canEdit={false} />
      </div>
    </div>
  );
};
