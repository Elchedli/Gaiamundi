import { Header } from 'components/Layout/Header';
import { usePageCarto } from 'hooks/usePageCarto';
import { FC } from 'react';
import { PageCartoChartPanel } from '../Editor/PageCartoChartPanel/PageCartoChartPanel';
import { PageCartoMap } from '../Editor/PageCartoMap';

export const PageCartoView: FC = () => {
  const { data } = usePageCarto();

  return (
    <div className="grid grid-cols-12 h-full grid-rows-2">
      <div className="col-span-7 row-span-2 p-2 relative">
        <PageCartoMap />
      </div>
      <div className="col-span-5 row-span-1 p-2 max-h-[50vh] overflow-y-auto">
        <Header>{data?.data.name}</Header>
        <div dangerouslySetInnerHTML={{ __html: data?.data.html || '' }}></div>
      </div>
      <div className="col-span-5 row-span-1 p-2">
        <PageCartoChartPanel />
      </div>
    </div>
  );
};
