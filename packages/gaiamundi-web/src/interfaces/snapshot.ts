import { ApiData } from './api';
import { GeoProjectionType } from './geojson';
import { PageCarto } from './page-carto';

export interface SnapshotBubble {
  indicatorId: number;
  colors: string[];
  opacity: number;
}

export interface SnapshotBase {
  indicatorId: number;
  projection: GeoProjectionType;
  colors: string[];
  bubble: SnapshotBubble;
  geoCode: string;
}

export interface SnapshotStub extends SnapshotBase {
  page_carto?: number;
}

export interface Snapshot extends SnapshotBase {
  page_carto: ApiData<PageCarto>;
}
