import { useMemo } from 'react';
import { ChartType, RawDatumType } from '../interfaces/chart';
import { useChart } from './useChartConfig';

export const ALLOWED_DOMAIN_TYPES_BY_CHART: {
  [key in ChartType]: Array<RawDatumType>;
} = {
  column: ['string', 'number'],
  bar: ['string', 'number'],
  scatter: ['number'],
  line: ['number'],
  lineColumn: ['string', 'number'],
  pie: ['number'],
  area: ['number'],
  bubble: ['number'],
};

export const useAllowedDataKeys = () => {
  const { dataKeys, chart: chartConfig } = useChart();
  const allowedTypes = ALLOWED_DOMAIN_TYPES_BY_CHART[chartConfig.type];
  const domainKeyOptions = useMemo(
    () =>
      Object.entries(dataKeys)
        .filter(([, type]) => {
          return allowedTypes.indexOf(type) !== -1;
        })
        .map(([key]) => ({
          value: key,
          label: key,
        })),
    [allowedTypes, dataKeys]
  );

  return { domainKeyOptions };
};
