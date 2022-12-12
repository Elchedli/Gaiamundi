import { User } from './user';

export interface GeoMap {
  name: string;
  owner: User;
  yearValidity: number;
  source: string;
  license: string;
  // TO-DO: appropriate type for geojson
  geojson: JSON;
}
