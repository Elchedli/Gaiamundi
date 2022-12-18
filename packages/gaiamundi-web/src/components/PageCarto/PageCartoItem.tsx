import { Link } from 'react-router-dom';
import { PageCarto } from 'interfaces/page-carto';

const PageCartoItem: React.FC<PageCarto> = ({
  id,
  attributes: { name, owner },
}) => {
  return (
    <Link to={`/page-carto/${id}`} className="group border">
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-400 xl:aspect-w-7 xl:aspect-h-8">
        {/* TO-DO: add a component that will render a thumbail of a pageCarto from a geojson file */}
        <img className="h-48 w-full object-cover object-center group-hover:opacity-75" />
      </div>
      <div className="p-2">
        <h3 className="text-lg font-medium text-gray-900">Titre: {name}</h3>
        <h4 className="text-xs text-gray-500">
          Créer par: {owner?.data?.attributes?.username}
        </h4>
        <p className="mt-1 text-sm text-gray-700">Description: {}</p>
      </div>
    </Link>
  );
};

export default PageCartoItem;
