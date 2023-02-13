import { ApiData } from 'interfaces/api';
import { GeoMap } from 'interfaces/geo-map';
import { getGeoMapThumbnailUrlById } from 'services/geo-map';

const GeoListItem: React.FC<ApiData<GeoMap>> = ({
  attributes: { yearValidity, name, source, license, geoJSON },
}) => {
  return (
    <div className="group border pb-2 cursor-pointer">
      <div className="bg-slate-300">
        <img
          src={getGeoMapThumbnailUrlById(geoJSON.data.id)}
          className="w-full object-contain object-center hover:opacity-75"
        />
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
    </div>
  );
};

export default GeoListItem;
