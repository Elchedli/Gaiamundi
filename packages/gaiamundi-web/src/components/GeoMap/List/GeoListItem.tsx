import { ApiData } from 'interfaces/api';
import { GeoMap } from 'interfaces/geo-map';
import { getGeoMapThumbnailUrlById } from 'services/geo-map';
import { GeoMapPopover } from './GeoMapPopover';

export const GeoListItem = ({
  yearValidity,
  name,
  source,
  license,
  geoJSON,
  properties,
}: ApiData<GeoMap>) => {
  return (
    <div className="group pb-2 cursor-pointer">
      <div className="bg-slate-300 relative">
        <img
          src={getGeoMapThumbnailUrlById(geoJSON.id)}
          className="w-full object-contain object-center hover:opacity-75 block h-auto"
        />
        <GeoMapPopover
          data-testid="buton-information"
          properties={[...properties]}
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
