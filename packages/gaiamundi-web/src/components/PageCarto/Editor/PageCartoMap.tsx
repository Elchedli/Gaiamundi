import { MinusIcon, PlusIcon } from '@heroicons/react/24/solid';
import 'eazychart-css';
import { MapChart, ResponsiveChartContainer } from 'eazychart-react';
import panzoom, { PanZoom } from 'panzoom';
import { FC, useCallback, useRef } from 'react';
import { useQuery } from 'react-query';

import { Alert } from 'components/Alert/Alert';
import { ApiErrorAlert } from 'components/Alert/ApiErrorMessage';
import { Button } from 'components/Button/Button';
import ButtonGroup from 'components/Button/ButtonGroup';
import { LoadingMessage } from 'components/Loader/LoadingMessage';
import { usePageCarto } from 'hooks/usePageCarto';
import { ApiData, ApiError } from 'interfaces/api';
import { UploadedFile } from 'interfaces/file';
import { getGeoJson } from 'services/geo-map';

export const PageCartoMap: FC = () => {
  const elementRef = useRef<SVGSVGElement | null>(null);
  const panzoomRef = useRef<PanZoom | null>(null);
  const { map } = usePageCarto();
  const geoJson = map?.data.attributes.geoJSON.data as ApiData<UploadedFile>;
  const { data, isError, isLoading, error } = useQuery({
    queryKey: ['geoJSON', geoJson.id],
    queryFn: async () => getGeoJson(geoJson),
    // The query will not execute until the userId exists
    enabled: !!geoJson,
  });

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

  if (isLoading) {
    return <LoadingMessage label={'Chargement de la carte ...'} />;
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
      <div className="w-full h-full overflow-hidden" ref={panZoomCallback}>
        <ResponsiveChartContainer>
          <MapChart
            map={{
              geoDomainKey: 'admin',
              valueDomainKey: 'value',
              projectionType: 'geoMercator',
              stroke: 'black',
              fill: 'black',
            }}
            padding={{ top: 0, right: 50, bottom: 150, left: 50 }}
            colors={['white', 'pink', 'red']}
            geoJson={data}
            data={data.features.map((feature: any, idx: number) => {
              return {
                admin: feature.properties?.admin,
                value: idx,
              };
            })}
          />
        </ResponsiveChartContainer>
      </div>
    </div>
  );
};
