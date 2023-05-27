import { TitlePageCartoEdit } from 'components/TitlePageCartoEdit/TitlePageCartoEdit';
import { FC } from 'react';
import { PageCartoChartPanel } from './PageCartoChartPanel/PageCartoChartPanel';
import { PageCartoMap } from './PageCartoMap';
import { PageCartoPanels } from './PageCartoPanels';

export const PageCartoEditor: FC = () => {
  return (
    <div className="grid grid-cols-12 h-full grid-rows-2">
      <div className="col-span-7 row-span-2 p-2 relative">
        <div className="w-full p-2 absolute z-50 flex bg-white bg-opacity-50">
          <TitlePageCartoEdit />
        </div>
        <PageCartoMap />
      </div>
      <div className="col-span-5 row-span-1 p-2">
        <PageCartoPanels />
      </div>
      <div className="col-span-5 row-span-1 p-2">
        <PageCartoChartPanel />
      </div>
    </div>
  );
};
