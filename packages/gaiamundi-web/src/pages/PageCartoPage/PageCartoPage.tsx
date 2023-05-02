import { PageCartoEditor } from 'components/PageCarto/Editor/PageCartoEditor';
import { PageCartoProvider } from 'hooks/usePageCarto';
import { useParams } from 'react-router-dom';

export const PageCartoEditPage: React.FC = () => {
  const params = useParams();
  const id = parseInt(params.id || '');
  return (
    <div className="h-full w-full scroll-auto">
      <PageCartoProvider id={id}>
        <PageCartoEditor />
      </PageCartoProvider>
    </div>
  );
};
