import { ApiData } from 'interfaces/api';
import { PageCarto } from 'interfaces/page-carto';
import { FC } from 'react';
import { PageCartoMap } from './PageCartoMap';
import { PageCartoPanels } from './PageCartoPanels';

type PageCartoEditorProps = {
  pageCarto: ApiData<PageCarto>;
};

export const PageCartoEditor: FC<PageCartoEditorProps> = ({ pageCarto }) => {
  const map = pageCarto.attributes.map.data;

  return (
    <div className="grid grid-cols-3 gap-4 h-full">
      <div className="col-span-2">
        <PageCartoMap map={map} />
      </div>
      <div className="col-span">
        <PageCartoPanels pageCarto={pageCarto} />
      </div>
    </div>
  );
};
