import { FC } from 'react';
import { PageCartoMap } from '../Editor/PageCartoMap';
import { PageCartoPanels } from '../Editor/PageCartoPanels';
import { PageCartoContent } from './PageCartoContent';

export const PageCartoReadOnly: FC = () => {
  const canEdit = false;
  return (
    <div className="grid grid-cols-3 gap-4 h-full">
      <div className="col-span-2">
        <PageCartoMap canEdit={canEdit} />
      </div>
      <div className="col-span">
        {canEdit ? <PageCartoPanels /> : <PageCartoContent />}
      </div>
    </div>
  );
};
