import { Alert } from 'components/Alert/Alert';
import { LoadingMessage } from 'components/Loader/LoadingMessage';
import { Dimensions, Direction } from 'eazychart-core';
import { ColumnChart } from 'eazychart-react';
import { ApiData } from 'interfaces/api';
import { AllChartConfigProps as AllChartProps, Chart } from 'interfaces/chart';
import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useQueryClient } from 'react-query';
import { guessDomainKey } from 'utils/chart';
import { DEFAULT_DIMENSIONS, INITIAL_CHART_CONFIG } from 'utils/constants';
import { useChart } from './useChart';
import { useData } from './useData';

type ChartConfigContextType = {
  chart: ApiData<Chart>;
  ChartComponent: React.FC<AllChartProps>;
  updateChartProps: (_props: Partial<AllChartProps>) => void;
  updateChart: (config: Partial<Chart>) => void;
  dimensions: Dimensions;
  setDimensions: (_dimensions: Dimensions) => void;
  pageCartoId?: number;
};

const initialContext: ChartConfigContextType = {
  chart: INITIAL_CHART_CONFIG,
  ChartComponent: ColumnChart,
  updateChartProps: (_props: Partial<AllChartProps>) => undefined,
  updateChart: (_config: Partial<Chart>) => undefined,
  dimensions: DEFAULT_DIMENSIONS,
  setDimensions: (_dimensions: Dimensions) => undefined,
};

const ChartConfigContext =
  createContext<ChartConfigContextType>(initialContext);

type ChartConfigProviderProps = {
  chartId: number;
  children: ReactNode;
  pageCartoId?: number;
};

export const ChartConfigProvider: FC<ChartConfigProviderProps> = ({
  chartId,
  children,
  pageCartoId,
}) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const { dataKeys, selectedData: chartData } = useData();
  const [dimensions, setDimensions] = useState<Dimensions>(DEFAULT_DIMENSIONS);
  const queryClient = useQueryClient();
  const {
    data: response,
    error,
    isLoading,
    ChartComponent,
  } = useChart(chartId);

  // Global chart uses the raw data, while non global appears when a geo feature is selected
  const chart = response?.data || INITIAL_CHART_CONFIG;

  const setChart = (newChart: ApiData<Chart> | undefined) => {
    queryClient.setQueryData(['chart', chartId], {
      data: { ...newChart, page_carto: pageCartoId },
    });
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

  useEffect(() => {
    switch (chart.type) {
      case 'column':
        updateChartProps({
          xAxis: {
            ...chart.props.xAxis,
            domainKey: guessDomainKey(chartData, 'string', 0),
          },
          yAxis: {
            ...chart.props.yAxis,
            domainKey: guessDomainKey(chartData, 'number', 1),
          },
        });
        break;
      case 'lineColumn':
        updateChartProps({
          xAxis: {
            ...chart.props.xAxis,
            domainKey: guessDomainKey(chartData, 'string', 0),
          },
          yAxis: {
            ...chart.props.yAxis,
            domainKey: guessDomainKey(chartData, 'number', 1),
          },
        });
        break;
      case 'bar':
        updateChartProps({
          xAxis: {
            ...chart.props.xAxis,
            domainKey: guessDomainKey(chartData, 'number', 0),
          },
          yAxis: {
            ...chart.props.yAxis,
            domainKey: guessDomainKey(chartData, 'string', 1),
          },
        });
        break;
      case 'pie':
        updateChartProps({
          domainKey: guessDomainKey(chartData, 'number', 0),
        });
        break;
      case 'line':
        updateChartProps({
          xAxis: {
            ...chart.props.xAxis,
            domainKey: guessDomainKey(chartData, 'number', 0),
          },
          yAxis: {
            ...chart.props.yAxis,
            domainKey: guessDomainKey(chartData, 'number', 1),
          },
        });
        break;
      case 'area':
        updateChartProps({
          xAxis: {
            ...chart.props.xAxis,
            domainKey: guessDomainKey(chartData, 'number', 0),
          },
          yAxis: {
            ...chart.props.yAxis,
            domainKey: guessDomainKey(chartData, 'number', 1),
          },
        });
        break;
      case 'scatter':
        updateChartProps({
          xAxis: {
            ...chart.props.xAxis,
            domainKey: guessDomainKey(chartData, 'number', 0),
          },
          yAxis: {
            ...chart.props.yAxis,
            domainKey: guessDomainKey(chartData, 'number', 1),
          },
        });
        break;
      case 'bubble':
        updateChartProps({
          xAxis: {
            ...chart.props.xAxis,
            domainKey: guessDomainKey(chartData, 'number', 0),
          },
          yAxis: {
            ...chart.props.yAxis,
            domainKey: guessDomainKey(chartData, 'number', 1),
          },
        });
        break;

      default:
        break;
    }
    setIsInitialized(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chart.type, dataKeys]);

  if (isLoading || !isInitialized) {
    return <LoadingMessage />;
  }

  if (error) {
    return <Alert>Impossible de charger le graphique</Alert>;
  }

  return (
    <ChartConfigContext.Provider
      value={{
        chart,
        updateChartProps,
        updateChart,
        ChartComponent,
        dimensions,
        setDimensions,
        pageCartoId,
      }}
    >
      {children}
    </ChartConfigContext.Provider>
  );
};

export const useChartConfig = () => {
  return useContext(ChartConfigContext);
};

export const useChartGridConfig = () => {
  const { chart, updateChartProps } = useChartConfig();

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
