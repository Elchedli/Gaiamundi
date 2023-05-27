import { Dimensions, Direction, Position } from 'eazychart-core';
import { ApiData } from 'interfaces/api';
import { Chart, RawDatum } from 'interfaces/chart';
import { PageCarto } from 'interfaces/page-carto';

export const DEFAULT_DIMENSIONS: Dimensions = {
  width: 256,
  height: 256,
};

export const DEFAULT_CHART_DATA: RawDatum[] = [
  { value: 9, name: 'Alpha', id: '1', v: 2 },
  { value: 45, name: 'Beta', id: '2', v: 5 },
  { value: 29, name: 'Gamma', id: '3', v: 10 },
  { value: 30, name: 'Delta', id: '4', v: 4 },
  { value: 50, name: 'Epsilon', id: '5', v: 8 },
  { value: 19, name: 'Zeta', id: '6', v: 2 },
  { value: 25, name: 'Eta', id: '7', v: 5 },
  { value: 30, name: 'Theta', id: '8', v: 10 },
  { value: 2, name: 'Iota', id: '9', v: 4 },
  { value: 65, name: 'Kappa', id: '10', v: 8 },
];

export const INITIAL_CHART_CONFIG: ApiData<Chart> = {
  id: 0,
  name: 'Untitled Chart',
  is_global: true,
  type: 'column',
  page_carto: 5 as unknown as ApiData<PageCarto>,
  props: {
    colors: ['#26547c', '#ef476f', '#ffd166', '#06d6a0', '#06d6d1'],
    domainKey: 'value',
    animationOptions: {
      easing: 'easeBack',
      duration: 400,
      delay: 0,
    },
    padding: {
      left: 70,
      bottom: 40,
      right: 40,
      top: 40,
    },
    isRTL: false,
    xAxis: {
      domainKey: 'name',
      position: Position.BOTTOM,
      nice: 2,
    },
    yAxis: {
      domainKey: 'value',
      position: Position.LEFT,
      nice: 2,
    },
    grid: {
      directions: [Direction.HORIZONTAL, Direction.VERTICAL],
      color: 'rgba(168,168,168,1)',
    },
    arc: { donutRadius: 0, strokeWidth: 1 },
    bubble: {
      domainKey: 'value',
      minRadius: 1,
      maxRadius: 100,
      fill: '#339999a0',
    },
    area: {
      stroke: '#339999',
      strokeWidth: 2,
      fill: '#ef476f80',
      curve: 'curveLinear',
    },
    yLineAxis: {
      domainKey: 'value',
      position: Position.RIGHT,
    },
  },
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

export const GEO_CODE = '__geoCode__';

export const NO_DOMAINKEY = '__none__';
