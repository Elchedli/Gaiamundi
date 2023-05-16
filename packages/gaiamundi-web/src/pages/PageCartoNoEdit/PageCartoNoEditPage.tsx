import { PageCartoReadOnly } from 'components/PageCarto/ReadOnly/PageCartoReadOnly';
import { PageCartoProvider } from 'hooks/usePageCarto';
import { useParams } from 'react-router-dom';

export const PageCartoNoEditPage: React.FC = () => {
  const params = useParams();
  const id = parseInt(params.id || '');
  return (
    <div className="h-full w-full">
      <PageCartoProvider id={id}>
        <PageCartoReadOnly />
      </PageCartoProvider>
    </div>
  );
};
