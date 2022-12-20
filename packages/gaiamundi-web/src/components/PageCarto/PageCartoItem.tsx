import { Link } from 'react-router-dom';
import { PageCarto } from 'interfaces/page-carto';

const PageCartoItem: React.FC<PageCarto> = ({
  id,
  attributes: { name, owner, tags, map, cover },
}) => {
  const ImgUrl = (cover as any)?.data?.attributes?.formats?.thumbnail.url;
  return (
    <>
      <Link to={`/page-carto/${id}?populate=*`} className="group border">
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-400 xl:aspect-w-7 xl:aspect-h-8">
          <img
            src={'http://localhost:1337' + ImgUrl}
            className="h-48 w-full object-cover object-center group-hover:opacity-75"
          />
        </div>
        <div className="p-2">
          <h3 className="text-lg font-medium text-gray-900">Titre: {name}</h3>
          <h3 className="text-lg font-medium text-gray-900">
            Titre Map: {(map as any)?.data?.attributes?.name}
          </h3>
          <h4 className="text-xs text-gray-500">
            Créer par: {owner?.data?.attributes?.username}
          </h4>
          <h4 className="text-xs text-gray-500">
            Tags :
            {(tags as any)?.data?.map((tag: any) => {
              return tag?.attributes?.name;
            })}
          </h4>
          <h4 className="text-xs text-gray-500"></h4>
          <p className="mt-1 text-sm text-gray-700"></p>
        </div>
      </Link>
    </>
  );
};

export default PageCartoItem;
