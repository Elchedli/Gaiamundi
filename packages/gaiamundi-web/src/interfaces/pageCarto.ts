import { Map } from './map';
import { User } from './user';

export interface PageCarto {
  id?: string;
  name: string;
  owner: User;
  //TO-DO: Change optional attributes
  description?: string;
  map?: Map;
  html?: HTMLElement;
}
