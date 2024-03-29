import {
  AreaChartIcon,
  BarChartIcon,
  BubbleChartIcon,
  ColumnChartIcon,
  LineChartIcon,
  LineColumnChartIcon,
  PieChartIcon,
  ScatterChartIcon,
} from 'components/Icons/Charts';
import { AnimationEasing, AnimationOptions } from 'eazychart-core';
import {
  AreaChart,
  AreaChartProps,
  BarChart,
  BarChartProps,
  BubbleChart,
  BubbleChartProps,
  ColumnChart,
  LineChart,
  LineChartProps,
  LineColumnChart,
  PieChart,
  PieChartProps,
  ScatterChart,
  ScatterChartProps,
} from 'eazychart-react';
import { ApiData } from './api';
import { PageCarto } from './page-carto';

type ChartConfigProps<T> = Omit<
  T,
  'scopedSlots' | 'animationOptions' | 'rawData'
> & {
  animationOptions: Omit<AnimationOptions, 'easing'> & {
    easing: AnimationEasing;
  };
};

export type ChartType =
  | 'column'
  | 'bar'
  | 'pie'
  | 'line'
  | 'scatter'
  | 'bubble'
  | 'area'
  | 'lineColumn';

export type ChartTypes = {
  [key in ChartType]: {
    Icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
    ChartComponent: React.FC<AllChartConfigProps>;
  };
};

export type AllChartConfigProps = ChartConfigProps<BarChartProps> &
  ChartConfigProps<PieChartProps> &
  ChartConfigProps<LineChartProps> &
  ChartConfigProps<ScatterChartProps> &
  ChartConfigProps<BubbleChartProps> &
  ChartConfigProps<AreaChartProps>;

export type Chart = {
  name: string;
  is_global: boolean;
  type: ChartType;
  props: AllChartConfigProps;
  page_carto: ApiData<PageCarto>;
};

export const CHART_TYPES: ChartTypes = {
  column: {
    Icon: ColumnChartIcon,
    ChartComponent: ColumnChart,
  },
  bar: {
    Icon: BarChartIcon,
    ChartComponent: BarChart,
  },
  pie: {
    Icon: PieChartIcon,
    ChartComponent: PieChart,
  },
  line: {
    Icon: LineChartIcon,
    ChartComponent: LineChart,
  },
  scatter: {
    Icon: ScatterChartIcon,
    ChartComponent: ScatterChart,
  },
  bubble: {
    Icon: BubbleChartIcon,
    ChartComponent: BubbleChart,
  },
  area: {
    Icon: AreaChartIcon,
    ChartComponent: AreaChart,
  },
  lineColumn: {
    Icon: LineColumnChartIcon,
    ChartComponent: LineColumnChart,
  },
};

export const getChartIconByType = (type: keyof typeof CHART_TYPES) => {
  return type in CHART_TYPES ? CHART_TYPES[type].Icon : null;
};

export type RawDatumType =
  | 'string'
  | 'number'
  | 'bigint'
  | 'boolean'
  | 'symbol'
  | 'undefined'
  | 'object'
  | 'function';

export type RawDatum = Record<string, any>;
