import { ApiDocument } from 'interfaces/api';
import { GeoProjectionType } from 'interfaces/geojson';
import { Snapshot, SnapshotStub } from 'interfaces/snapshot';
import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useMutation } from 'react-query';
import { createSnapshot } from '../services/snapshot';
import { useData } from './useData';
import { usePageCarto } from './usePageCarto';
import { useToast } from './useToast';

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
  addSnapshot: () => Promise<ApiDocument<SnapshotStub>>;
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
  addSnapshot: () => {
    return Promise.reject();
  },
};

const SnapshotContext = createContext<SnapshotContextType>(initialContext);

type SnapshotProviderProps = {
  snapshot?: ApiDocument<Snapshot>;
  children: ReactNode;
};

export const SnapshotProvider: FC<SnapshotProviderProps> = ({
  snapshot,
  children,
}) => {
  const { indicators, pageCartoId } = usePageCarto();
  const { selectedGeoCode } = useData();
  const [indicatorId, updateIndicatorId] = useState(initialContext.indicatorId);
  const [projection, updateProjection] = useState(initialContext.projection);
  const [colors, updateColors] = useState(initialContext.colors);
  const [bubble, setBubble] = useState(initialContext.bubble);
  const { addToast } = useToast();

  const { mutateAsync } = useMutation({
    mutationFn: async () => {
      return await createSnapshot({
        indicatorId,
        projection,
        colors,
        bubble,
        page_carto: pageCartoId,
        geoCode: selectedGeoCode || '',
      });
    },
    onSuccess: () => {
      addToast({
        title: `Snapshot`,
        type: 'success',
        description: `Le snapshot a été crée avec succès`,
      });
    },
    onError: (error) => {
      addToast({
        title: 'Echec lors de la sauvegarde du snapshot',
        type: 'error',
        description: JSON.stringify(error),
      });
    },
  });

  const addSnapshot = async () => {
    return await mutateAsync();
  };

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

  useEffect(() => {
    if (snapshot) {
      updateIndicatorId(snapshot.data.indicatorId);
      updateProjection(snapshot.data.projection);
      updateColors(snapshot.data.colors);
      setBubble(snapshot.data.bubble);
    }
  }, [snapshot]);

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
        addSnapshot,
      }}
    >
      {children}
    </SnapshotContext.Provider>
  );
};

export const useSnapshot = () => {
  return useContext(SnapshotContext);
};
