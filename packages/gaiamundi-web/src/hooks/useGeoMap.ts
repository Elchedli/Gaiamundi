import { GeoMap } from 'interfaces/map';
import { useState } from 'react';
import { createMap, deleteMap, getMap, updateMap } from 'services/geo-map';

export const useGeoMap = () => {
  const [geoMaps, setGeoMaps] = useState<GeoMap[] | undefined>(undefined);

  const getGeoMap = async (query?: object | number) => {
    const { data } = await getMap(query);
    setGeoMaps(data);
  };

  const deleteGeoMap = async (id: number) => {
    return await deleteMap(id);
  };

  const updateGeoMap = async (id: number, data: Partial<GeoMap>) => {
    return await updateMap(id, data);
  };

  const createGeoMap = async (data: GeoMap) => {
    return await createMap(data);
  };

  return { geoMaps, getGeoMap, deleteGeoMap, updateGeoMap, createGeoMap };
};
