import { PageCartoView } from 'components/PageCarto/View/PageCartoView';
import { DataProvider } from 'hooks/useData';
import { PageCartoProvider } from 'hooks/usePageCarto';
import { SnapshotProvider } from 'hooks/useSnapshot';
import { useParams } from 'react-router-dom';

export const PageCartoViewPage: React.FC = () => {
  const params = useParams();
  const id = parseInt(params.id || '');
  return (
    <div className="h-full w-full scroll-auto">
      <PageCartoProvider id={id}>
        <DataProvider pageCartoId={id} geoCodeSelection={null}>
          <SnapshotProvider>
            <PageCartoView />
          </SnapshotProvider>
        </DataProvider>
      </PageCartoProvider>
    </div>
  );
};
