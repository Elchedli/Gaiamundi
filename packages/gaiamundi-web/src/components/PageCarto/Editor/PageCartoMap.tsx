import { MinusIcon, PlusIcon } from '@heroicons/react/24/solid';
import 'eazychart-css';
import { MapChart, ResponsiveChartContainer } from 'eazychart-react';
import { Feature } from 'interfaces/geojson';
import panzoom, { PanZoom } from 'panzoom';
import { FC, useCallback, useMemo, useRef } from 'react';
import { useQuery } from 'react-query';

import rewind from '@turf/rewind';
import { Alert } from 'components/Alert/Alert';
import { ApiErrorAlert } from 'components/Alert/ApiErrorMessage';
import { Button } from 'components/Button/Button';
import ButtonGroup from 'components/Button/ButtonGroup';
import { LoadingMessage } from 'components/Loader/LoadingMessage';
import { usePageCarto } from 'hooks/usePageCarto';
import { ApiData, ApiError } from 'interfaces/api';
import { UploadedFile } from 'interfaces/file';
import { Indicator } from 'interfaces/indicator';

import { evaluate } from 'mathjs';
import { getGeoJson } from 'services/geo-map';
import { fetchConvertedCsv } from 'utils/strapiUtils';

export const PageCartoMap: FC = () => {
  const elementRef = useRef<SVGSVGElement | null>(null);
  const panzoomRef = useRef<PanZoom | null>(null);
  const { map, pageCartoId, indicators, chosenIndicator } = usePageCarto();
  const geoJson = map?.geoJSON;
  const { data, isError, isLoading, isIdle, error } = useQuery({
    queryKey: ['geoJSON', geoJson?.id],
    queryFn: async () => getGeoJson(geoJson as ApiData<UploadedFile>),
    // The query will not execute until the userId exists
    enabled: !!geoJson,
  });

  const { data: mergedColumnDatas } = useQuery({
    queryKey: ['merged-columns', map?.properties],
    queryFn: async () => fetchConvertedCsv(pageCartoId),
    enabled: !!map?.properties,
  });

  const geoCode = useMemo(() => {
    const geoCodeProperty = map?.properties.find((property) => {
      return property.isGeoCode === true;
    });
    return geoCodeProperty ? geoCodeProperty.name : 'admin';
  }, [map]);

  const realIndicatorData = (indicator: Indicator) => {
    return mergedColumnDatas.map((mergedColumn: any) => {
      let realDataFormula = indicator.equation;
      indicator.variables.forEach((variable) => {
        realDataFormula = realDataFormula.replaceAll(
          variable.alias,
          mergedColumn[variable.columnName]
        );
      });
      return {
        geocode: mergedColumn.__geoCode__,
        formula: evaluate(realDataFormula),
      };
    });
  };

  const mapValues = useMemo(() => {
    //change variable after
    const indicator = indicators?.find(
      (indicator: Indicator) => indicator.name === chosenIndicator.indicatorName
    );
    if (indicator != undefined) return realIndicatorData(indicator);
    return [];
  }, [mergedColumnDatas, chosenIndicator]);

  // Set up panzoom on mount, and dispose on unmount
  const panZoomCallback = useCallback((element: HTMLDivElement | null) => {
    if (element) {
      elementRef.current = element.querySelector('svg');
      if (elementRef.current) {
        panzoomRef.current = panzoom(elementRef.current, {
          zoomSpeed: 0.1,
          minZoom: 0.25,
          maxZoom: 4,
          smoothScroll: true,
          bounds: true,
          boundsPadding: 0.4,
        });
      }
    }
  }, []);

  const zoomIn = () => {
    if (elementRef.current) {
      const rect = elementRef.current.getBBox();
      const cx = rect.x + rect.width / 2;
      const cy = rect.y + rect.height / 2;
      panzoomRef.current?.smoothZoom(cx, cy, 1.25);
    }
  };

  const zoomOut = () => {
    if (elementRef.current) {
      const rect = elementRef.current.getBBox();
      const cx = rect.x + rect.width / 2;
      const cy = rect.y + rect.height / 2;
      panzoomRef.current?.smoothZoom(cx, cy, 0.75);
    }
  };

  const geoJsonData = useMemo(() => {
    return data
      ? {
          ...data,
          features: data.features.map((feature: Feature) => {
            return rewind(feature as any, { reverse: true });
          }),
        }
      : {};
  }, [data]);

  if (isLoading || isIdle) {
    return (
      <LoadingMessage
        label={'Chargement de la carte ...'}
        data-testid="loading-message"
      />
    );
  }

  if (isError) {
    return <ApiErrorAlert error={error as ApiError} />;
  }

  if (!data) {
    return <Alert type="info">Impossible de charger la carte.</Alert>;
  }

  return (
    <div className="w-full h-full relative">
      <ButtonGroup pill={true} className="m-4 absolute z-50">
        <Button icon={PlusIcon} onClick={zoomIn} />
        <Button icon={MinusIcon} onClick={zoomOut} />
      </ButtonGroup>
      <div
        className="w-full h-full overflow-hidden"
        ref={panZoomCallback}
        data-testid={'map-chart'}
      >
        <ResponsiveChartContainer>
          <MapChart
            map={{
              geoDomainKey: geoCode,
              valueDomainKey: 'value',
              projectionType: 'geoMercator',
              stroke: 'black',
              fill: 'white',
            }}
            padding={{ top: 0, right: 50, bottom: 150, left: 50 }}
            colors={['white', 'pink', 'red']}
            geoJson={geoJsonData}
            data={mapValues.map((mapValue: any) => {
              return {
                [geoCode]: mapValue.geocode,
                value: mapValue.formula,
              };
            })}
          />
        </ResponsiveChartContainer>
      </div>
    </div>
  );
};
