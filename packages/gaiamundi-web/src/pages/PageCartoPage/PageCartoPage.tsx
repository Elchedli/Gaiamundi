import { PageCartoEditor } from 'components/PageCarto/Editor/PageCartoEditor';
import { TitlePageCartoEdit } from 'components/TitlePageCartoEdit/TitlePageCartoEdit';
import { PageCartoProvider } from 'hooks/usePageCarto';
import { useParams } from 'react-router-dom';

export const PageCartoEditPage: React.FC = () => {
  const params = useParams();
  const id = parseInt(params.id || '');
  return (
    <div className="h-full w-full">
      <PageCartoProvider id={id}>
        <div className="p-1">
          <div id="TitlePageCarto" className=" p-1 border-b flex flex-wrap">
            <TitlePageCartoEdit />
          </div>
        </div>
        <PageCartoEditor />
      </PageCartoProvider>
    </div>
  );
};
