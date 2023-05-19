import { FC } from 'react';
import { PageCartoMap } from '../Editor/PageCartoMap';
import { PageCartoContent } from './PageCartoContent';

export const PageCartoReadOnly: FC = () => {
  return (
    <div className="grid grid-cols-3 gap-4 h-full">
      <div className="col-span-2">
        <PageCartoMap canEdit={false} />
      </div>
      <div className="col-span">
        <PageCartoContent />
      </div>
    </div>
  );
};
