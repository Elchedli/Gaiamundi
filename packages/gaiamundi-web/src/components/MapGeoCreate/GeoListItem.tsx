import { ApiData } from 'interfaces/api';
import { GeoMap } from 'interfaces/geo-map';
import { Link } from 'react-router-dom';

const GeoListItem: React.FC<ApiData<GeoMap>> = ({
  id,
  attributes: { yearValidity, name, source, license },
}) => {
  return (
    <div className="group border pb-2">
      <Link to={`/page-carto/${id}?populate=*`}>
        <div className="aspect-w-1 aspect-h-1 w-fit overflow-hidden bg-gray-400 xl:aspect-w-7 xl:aspect-h-8">
          {
            <img
              src={`http://localhost:1337/api/geo-maps/thumbnail/${id}`}
              className="h-40 w-full object-cover object-center group-hover:opacity-75"
            />
          }
        </div>
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-400 xl:aspect-w-7 xl:aspect-h-8"></div>
        <div className="px-2 pt-2">
          <h3 className="text-lg font-medium text-gray-900">Titre: {name}</h3>
          <h4 className="text-xs text-gray-500 mt-0.5">Source : {source}</h4>
          <h4 className="text-xs text-gray-500">License : {license}</h4>
          <h4 className="text-xs text-gray-500">
            Annee de validitée : {yearValidity}
          </h4>
        </div>
      </Link>
    </div>
  );
};

export default GeoListItem;
