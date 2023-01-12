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
        <div className="p-3">
          <h2>{name}</h2>
          <div className="text-gray-500">
            <div className="text-sm my-1">
              <div className="my-1 font-bold">Source : {source}</div>
              <div className="text-xs mt-2">License : {license}</div>
              <div className="text-xs mt-2">
                Annee de validitée : {yearValidity}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default GeoListItem;
