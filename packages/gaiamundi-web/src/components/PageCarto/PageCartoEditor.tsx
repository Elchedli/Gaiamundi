import { useQuery } from 'react-query';
import { FC, useCallback, useRef } from 'react';
import { MapChart, ResponsiveChartContainer } from 'eazychart-react';
import panzoom, { PanZoom } from 'panzoom';

import { ApiErrorAlert } from 'components/Alert/ApiErrorMessage';
import { LoadingMessage } from 'components/Loader/LoadingMessage';
import { Alert } from 'components/Alert/Alert';
import { ApiData, ApiError } from 'interfaces/api';
import { PageCarto } from 'interfaces/page-carto';
import { getGeoJson } from 'services/geo-map';

import 'eazychart-css';
import ButtonGroup from 'components/Button/ButtonGroup';
import { Button } from 'components/Button/Button';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/solid';

type PageCartoEditorProps = {
  pageCarto: ApiData<PageCarto>;
};

export const PageCartoEditor: FC<PageCartoEditorProps> = ({ pageCarto }) => {
  const elementRef = useRef<SVGSVGElement | null>(null);
  const panzoomRef = useRef<PanZoom | null>(null);
  const map = pageCarto.attributes.map.data;
  const geoJson = map.attributes.geoJSON.data;
  const geoJsonQuery = useQuery({
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

  if (geoJsonQuery.isLoading) {
    return <LoadingMessage label={'Chargement de la carte ...'} />;
  }

  if (geoJsonQuery.isError) {
    return <ApiErrorAlert error={geoJsonQuery.error as ApiError} />;
  }

  if (!geoJsonQuery.data) {
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
            geoJson={geoJsonQuery.data}
            data={geoJsonQuery.data.features.map(
              (feature: any, idx: number) => {
                return {
                  admin: feature.properties?.admin,
                  value: idx,
                };
              }
            )}
          />
        </ResponsiveChartContainer>
      </div>
    </div>
  );
};
