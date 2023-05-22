import { GeoProjectionType } from 'interfaces/geojson';
import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from 'react';
import { usePageCarto } from './usePageCarto';

type SnapshotBubbleConfig = {
  indicatorId: number;
  colors: string[];
  minRadius: number;
  maxRadius: number;
  opacity: number;
};

type SnapshotContextType = {
  indicatorId: number;
  updateIndicatorId: (indicatorId: number) => void;
  projection: GeoProjectionType;
  updateProjection: (projection: GeoProjectionType) => void;
  colors: string[];
  updateColors: (colors: string[]) => void;
  bubble: SnapshotBubbleConfig;
  updateBubbleConfig: (
    key: keyof SnapshotBubbleConfig,
    config: SnapshotBubbleConfig[keyof SnapshotBubbleConfig]
  ) => void;
  mapDomainKey: string | undefined;
  bubbleDomainKey: string | undefined;
};

const initialContext: SnapshotContextType = {
  indicatorId: 0,
  updateIndicatorId: (_indicatorId: number) => {
    /** noop **/
  },
  projection: 'geoMercator',
  updateProjection: (_projection: GeoProjectionType) => {
    /** noop **/
  },
  colors: ['#FFDC8C', '#FFB66E', '#FF8538', '#F24F12', '#E50916'],
  updateColors: (_colors: string[]) => {
    /** noop **/
  },
  bubble: {
    indicatorId: 0,
    colors: ['aqua', 'lime'],
    minRadius: 10,
    maxRadius: 50,
    opacity: 0.5,
  },
  updateBubbleConfig: (
    _key: keyof SnapshotBubbleConfig,
    _config: Partial<SnapshotBubbleConfig[keyof SnapshotBubbleConfig]>
  ) => {
    /** noop **/
  },
  mapDomainKey: undefined,
  bubbleDomainKey: undefined,
};

const SnapshotContext = createContext<SnapshotContextType>(initialContext);

type SnapshotProviderProps = {
  children: ReactNode;
};

export const SnapshotProvider: FC<SnapshotProviderProps> = ({ children }) => {
  const { indicators } = usePageCarto();
  const [indicatorId, updateIndicatorId] = useState(initialContext.indicatorId);
  const [projection, updateProjection] = useState(initialContext.projection);
  const [colors, updateColors] = useState(initialContext.colors);
  const [bubble, setBubble] = useState(initialContext.bubble);

  const updateBubbleConfig = (
    key: keyof SnapshotBubbleConfig,
    config: SnapshotBubbleConfig[keyof SnapshotBubbleConfig]
  ) => {
    setBubble({
      ...bubble,
      [key]: config,
    });
  };

  const mapDomainKey = useMemo(
    () => indicators.find(({ id }) => id === indicatorId)?.name,
    [indicators, indicatorId]
  );

  const bubbleDomainKey = useMemo(
    () => indicators.find(({ id }) => id === bubble.indicatorId)?.name,
    [indicators, bubble.indicatorId]
  );

  return (
    <SnapshotContext.Provider
      value={{
        indicatorId,
        updateIndicatorId,
        projection,
        updateProjection,
        colors,
        updateColors,
        bubble,
        updateBubbleConfig,
        mapDomainKey,
        bubbleDomainKey,
      }}
    >
      {children}
    </SnapshotContext.Provider>
  );
};

export const useSnapshot = () => {
  return useContext(SnapshotContext);
};
