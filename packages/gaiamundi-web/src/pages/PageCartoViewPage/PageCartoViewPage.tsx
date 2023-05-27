import { PageCartoView } from 'components/PageCarto/View/PageCartoView';
import { DataProvider } from 'hooks/useData';
import { PageCartoProvider } from 'hooks/usePageCarto';
import { SnapshotProvider } from 'hooks/useSnapshot';
import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { useLocation, useParams } from 'react-router-dom';
import { getSnapshotById } from 'services/snapshot';

export const PageCartoViewPage: React.FC = () => {
  const params = useParams();
  const id = parseInt(params.id || '');
  const location = useLocation();

  const [currentSnapshotId, selectedGeoCode] = useMemo(() => {
    // Parse current url for snapshot args
    const [snapshotId, geoCode] = location.hash.substring(1).split(',');
    return [parseInt(snapshotId), geoCode];
  }, [location.hash]);

  const { data: snapshot } = useQuery({
    queryKey: ['snapshot', currentSnapshotId],
    queryFn: async () => {
      return await getSnapshotById(currentSnapshotId);
    },
    keepPreviousData: true,
    enabled: !!currentSnapshotId,
  });

  console.log('????', currentSnapshotId, selectedGeoCode);
  return (
    <div className="h-full w-full scroll-auto">
      <PageCartoProvider id={id}>
        <DataProvider pageCartoId={id} geoCodeSelection={selectedGeoCode}>
          <SnapshotProvider snapshot={snapshot}>
            <PageCartoView />
          </SnapshotProvider>
        </DataProvider>
      </PageCartoProvider>
    </div>
  );
};
