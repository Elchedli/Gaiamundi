import { LoadingMessage } from 'components/Loader/LoadingMessage';
import { Dimensions, Direction } from 'eazychart-core';
import { ColumnChart } from 'eazychart-react';
import { ApiData } from 'interfaces/api';
import {
  AllChartConfigProps as AllChartProps,
  CHART_TYPES,
  Chart,
  RawDatum,
  RawDatumType,
} from 'interfaces/chart';
import React, {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { getChartById } from 'services/chart';
import { getDataTypeMap, guessDomainKey } from 'utils/chart';
import { DEFAULT_DIMENSIONS, INITIAL_CHART_CONFIG } from 'utils/constants';

type ChartConfigContextType = {
  chart: ApiData<Chart>;
  ChartComponent: React.FC<AllChartProps>;
  updateChartProps: (_props: Partial<AllChartProps>) => void;
  updateChart: (config: Partial<Chart>) => void;
  rawData: RawDatum[];
  dataKeys: Record<string, RawDatumType>;
  dimensions: Dimensions;
  setDimensions: (_dimensions: Dimensions) => void;
};

const initialContext: ChartConfigContextType = {
  chart: INITIAL_CHART_CONFIG,
  ChartComponent: ColumnChart,
  updateChartProps: (_props: Partial<AllChartProps>) => undefined,
  updateChart: (_config: Partial<Chart>) => undefined,
  rawData: [],
  dataKeys: {},
  dimensions: DEFAULT_DIMENSIONS,
  setDimensions: (_dimensions: Dimensions) => undefined,
};

const ChartConfigContext =
  createContext<ChartConfigContextType>(initialContext);

type ChartConfigProviderProps = {
  chartId: number;
  rawData: RawDatum[];
  children: ReactNode;
};

export const ChartConfigProvider: FC<ChartConfigProviderProps> = ({
  chartId,
  rawData,
  children,
}) => {
  const [dimensions, setDimensions] = useState<Dimensions>(DEFAULT_DIMENSIONS);
  const queryClient = useQueryClient();
  const {
    data: response,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['chart', chartId],
    queryFn: async () => await getChartById(chartId),
    enabled: !!chartId,
  });

  const chart = response?.data || INITIAL_CHART_CONFIG;
  const setChart = (newChart: ApiData<Chart> | undefined) => {
    queryClient.setQueryData(['chart', chartId], { data: newChart });
  };

  const updateChartProps = (props: Partial<AllChartProps>) => {
    setChart({
      ...chart,
      props: {
        ...chart.props,
        ...props,
      },
    });
  };

  const updateChart = (updates: Partial<Chart>) => {
    setChart({ ...chart, ...updates });
  };

  const ChartComponent = useMemo(() => {
    return chart?.type
      ? CHART_TYPES[chart.type].ChartComponent
      : CHART_TYPES.column.ChartComponent;
  }, [chart]);

  const dataKeys = useMemo(() => {
    if (rawData.length > 0) {
      return getDataTypeMap(rawData[0]);
    }
    return {};
  }, [rawData]);

  useEffect(() => {
    switch (chart.type) {
      case 'column':
        updateChartProps({
          xAxis: {
            ...chart.props.xAxis,
            domainKey: guessDomainKey(rawData, 'string', 0),
          },
          yAxis: {
            ...chart.props.yAxis,
            domainKey: guessDomainKey(rawData, 'number', 1),
          },
        });
        break;
      case 'lineColumn':
        updateChartProps({
          xAxis: {
            ...chart.props.xAxis,
            domainKey: guessDomainKey(rawData, 'string', 0),
          },
          yAxis: {
            ...chart.props.yAxis,
            domainKey: guessDomainKey(rawData, 'number', 1),
          },
        });
        break;
      case 'bar':
        updateChartProps({
          xAxis: {
            ...chart.props.xAxis,
            domainKey: guessDomainKey(rawData, 'number', 0),
          },
          yAxis: {
            ...chart.props.yAxis,
            domainKey: guessDomainKey(rawData, 'string', 1),
          },
        });
        break;
      case 'pie':
        updateChartProps({
          domainKey: guessDomainKey(rawData, 'number', 0),
        });
        break;
      case 'line':
        updateChartProps({
          xAxis: {
            ...chart.props.xAxis,
            domainKey: guessDomainKey(rawData, 'number', 0),
          },
          yAxis: {
            ...chart.props.yAxis,
            domainKey: guessDomainKey(rawData, 'number', 1),
          },
        });
        break;
      case 'area':
        updateChartProps({
          xAxis: {
            ...chart.props.xAxis,
            domainKey: guessDomainKey(rawData, 'number', 0),
          },
          yAxis: {
            ...chart.props.yAxis,
            domainKey: guessDomainKey(rawData, 'number', 1),
          },
        });
        break;
      case 'scatter':
        updateChartProps({
          xAxis: {
            ...chart.props.xAxis,
            domainKey: guessDomainKey(rawData, 'number', 0),
          },
          yAxis: {
            ...chart.props.yAxis,
            domainKey: guessDomainKey(rawData, 'number', 1),
          },
        });
        break;
      case 'bubble':
        updateChartProps({
          xAxis: {
            ...chart.props.xAxis,
            domainKey: guessDomainKey(rawData, 'number', 0),
          },
          yAxis: {
            ...chart.props.yAxis,
            domainKey: guessDomainKey(rawData, 'number', 1),
          },
        });
        break;

      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chart.type, dataKeys]);

  if (isLoading) {
    return <LoadingMessage />;
  }

  if (error) {
    return <>{error}</>;
  }

  return (
    <ChartConfigContext.Provider
      value={{
        chart,
        updateChartProps,
        updateChart,
        ChartComponent,
        dataKeys,
        rawData,
        dimensions,
        setDimensions,
      }}
    >
      {children}
    </ChartConfigContext.Provider>
  );
};

export const useChart = () => {
  return useContext(ChartConfigContext);
};

export const useChartGridConfig = () => {
  const { chart, updateChartProps } = useChart();

  const updateGridDirection = (direction: Direction, isEnabled: boolean) => {
    let gridDirections = [...chart.props.grid.directions] as Direction[];
    if (isEnabled) {
      gridDirections.push(direction);
    } else {
      gridDirections = gridDirections.filter((dir) => dir !== direction);
    }
    updateChartProps({
      grid: {
        ...chart.props.grid,
        directions: gridDirections,
      },
    });
  };

  const updateGridColor = (color: string) => {
    updateChartProps({
      grid: {
        ...chart.props.grid,
        color,
      },
    });
  };

  return {
    grid: chart.props.grid,
    updateGridDirection,
    updateGridColor,
  };
};
