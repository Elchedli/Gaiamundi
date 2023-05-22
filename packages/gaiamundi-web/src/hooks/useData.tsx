import { Alert } from 'components/Alert/Alert';
import { LoadingMessage } from 'components/Loader/LoadingMessage';
import { RawDatum, RawDatumType } from 'interfaces/chart';
import { GeoFeatureDatum } from 'interfaces/geojson';
import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useQuery } from 'react-query';
import { getPageCartoData } from 'services/dataset';
import { getDataTypeMap } from 'utils/chart';
import { GEO_CODE } from 'utils/constants';
import { calculateIndicator } from 'utils/equation';
import { usePageCarto } from './usePageCarto';

type DatasetContextType = {
  rawData: RawDatum[];
  indicatorData: RawDatum[];
  selectedData: RawDatum[];
  dataKeys: Record<string, RawDatumType>;
  selectedGeoCode: string | null;
  selectGeoCode: (
    shapeDatum: GeoFeatureDatum | null,
    e: React.MouseEvent
  ) => void;
};

const initialContext: DatasetContextType = {
  rawData: [],
  indicatorData: [],
  selectedData: [],
  dataKeys: {},
  selectedGeoCode: null,
  selectGeoCode: () => {
    /** noop **/
  },
};

const DatasetContext = createContext<DatasetContextType>(initialContext);

type DataProviderProps = {
  pageCartoId: number;
  geoCodeSelection: string | null;
  children: ReactNode;
};

export const DataProvider: FC<DataProviderProps> = ({
  pageCartoId,
  geoCodeSelection,
  children,
}) => {
  const [selectedGeoCode, setSelectedGeoCode] = useState<string | null>(
    geoCodeSelection
  );
  const selectedGeoFeatureRef = useRef<SVGElement | null>(null);
  const { indicators } = usePageCarto();
  const {
    data: rawData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['page-carto-dataset', pageCartoId],
    queryFn: async () => await getPageCartoData(pageCartoId),
    enabled: !!pageCartoId,
  });

  const indicatorData = useMemo(
    () =>
      rawData?.map((datum) => {
        // Calculate indicators
        return indicators.reduce(
          (acc, indicator) => {
            acc[indicator.name] = calculateIndicator(indicator, datum);
            return acc;
          },
          { [GEO_CODE]: datum[GEO_CODE] } as RawDatum
        );
      }),
    [rawData, indicators]
  );

  const selectGeoCode = (
    shapeDatum: GeoFeatureDatum | null,
    e: React.MouseEvent
  ) => {
    e.stopPropagation();
    // unselect current geo feature (if any)
    if (selectedGeoFeatureRef.current) {
      selectedGeoFeatureRef.current.classList.remove('selected-geo-feature');
    }
    // Select geo feature
    selectedGeoFeatureRef.current = e.target as SVGElement;
    if (selectedGeoFeatureRef.current.tagName === 'path') {
      selectedGeoFeatureRef.current.classList.add('selected-geo-feature');
    }
    const properties = shapeDatum?.feature.properties;
    const geoCode =
      properties && GEO_CODE in properties ? properties[GEO_CODE] : null;
    setSelectedGeoCode(geoCode);
  };

  const selectedData = useMemo(() => {
    // No geo feature selected
    if (!selectedGeoCode) {
      return undefined;
    }

    const datum = rawData?.find((d) => d[GEO_CODE] === selectedGeoCode);
    // Transpose datum values to be able to plot a chart
    if (datum) {
      return Object.entries(datum)
        .filter(([key]) => key !== GEO_CODE)
        .map(([key, value]) => {
          return { key, value };
        });
    }

    return undefined;
  }, [selectedGeoCode, rawData]);

  const dataKeys = useMemo(() => {
    const data = selectedGeoCode ? selectedData : rawData;
    if (data && data.length > 0) {
      return getDataTypeMap(data[0]);
    }
    return {};
  }, [selectedGeoCode, rawData, selectedData]);

  useEffect(() => {
    if (geoCodeSelection !== selectedGeoCode) {
      setSelectedGeoCode(geoCodeSelection);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geoCodeSelection]);

  if (isLoading) {
    return <LoadingMessage />;
  }

  if (error) {
    return <Alert>Erreur lors du chargement des données</Alert>;
  }

  return (
    <DatasetContext.Provider
      value={{
        rawData: rawData || [],
        indicatorData: indicatorData || [],
        selectedData: selectedData || [],
        dataKeys,
        selectedGeoCode,
        selectGeoCode,
      }}
    >
      {children}
    </DatasetContext.Provider>
  );
};

export const useData = () => {
  return useContext(DatasetContext);
};
