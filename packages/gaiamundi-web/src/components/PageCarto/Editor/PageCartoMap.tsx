import { CameraIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/solid';
import 'eazychart-css';
import { BubbleMapChart, ResponsiveChartContainer } from 'eazychart-react';
import { Feature } from 'interfaces/geojson';
import panzoom, { PanZoom } from 'panzoom';
import { FC, useCallback, useMemo, useRef } from 'react';
import { useMutation, useQuery } from 'react-query';

import rewind from '@turf/rewind';
import { Alert } from 'components/Alert/Alert';
import { ApiErrorAlert } from 'components/Alert/ApiErrorMessage';
import { Button } from 'components/Button/Button';
import ButtonGroup from 'components/Button/ButtonGroup';
import { LoadingMessage } from 'components/Loader/LoadingMessage';
import { TitlePageCartoEdit } from 'components/TitlePageCartoEdit/TitlePageCartoEdit';
import { useData } from 'hooks/useData';
import { usePageCarto } from 'hooks/usePageCarto';
import { useSnapshot } from 'hooks/useSnapshot';
import { useToast } from 'hooks/useToast';
import { ApiData, ApiError } from 'interfaces/api';
import { UploadedFile } from 'interfaces/file';
import { getGeoJson } from 'services/geo-map';
import { uploadCover } from 'services/page-carto';
import { rasterizeSvg } from 'utils/thumbnail-generator';

export const PageCartoMap: FC = () => {
  const elementRef = useRef<SVGSVGElement | null>(null);
  const panzoomRef = useRef<PanZoom | null>(null);
  const { addToast } = useToast();
  const { map, pageCartoId } = usePageCarto();
  const { rawData } = useData();
  const snapshot = useSnapshot();
  const geoJson = map?.geoJSON;
  const { data, isError, isLoading, isIdle, error } = useQuery({
    queryKey: ['geoJSON', geoJson?.id],
    queryFn: async () => getGeoJson(geoJson as ApiData<UploadedFile>),
    // The query will not execute until the userId exists
    enabled: !!geoJson,
  });

  const { mutateAsync: uploadPageCartoCover } = useMutation({
    mutationFn: async ({ thumbnail }: { thumbnail: File }) => {
      return await uploadCover(thumbnail, pageCartoId);
    },
    onSuccess: (data: UploadedFile) => {
      addToast({
        title: `Aperçu généré`,
        description: `Fichier ${data.name} téléchargé avec succès`,
        type: 'success',
      });
    },
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

  const generateThumbnail = async () => {
    if (elementRef.current) {
      // This function is the one the svg and make it into an image.
      const thumbnail = await rasterizeSvg(elementRef.current);
      // The new image is sent to the api and change it for the specific pageCartos
      uploadPageCartoCover({ thumbnail });
    }
  };

  const geoCodeProperty = useMemo(
    () =>
      map?.properties.find((property) => {
        return property.isGeoCode;
      }),
    [map?.properties]
  );

  const geoJsonData = useMemo(() => {
    return data
      ? {
          ...data,
          features: data.features.map((feature: Feature) => {
            // Set __geoCode__ in GeoJSON
            if (feature.properties && geoCodeProperty) {
              feature.properties.__geoCode__ =
                feature.properties[geoCodeProperty.name];
            } else {
              // eslint-disable-next-line no-console
              console.warn(
                'Unable to find geocode property, either GeoJSON is inconsistent or something went wrong...',
                feature,
                geoCodeProperty
              );
            }
            // Rewind feature path (right hand rule compatibility)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return rewind(feature as any, { reverse: true });
          }),
        }
      : {};
  }, [data, geoCodeProperty]);

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
      <div className="w-full p-2 absolute z-50 flex bg-white bg-opacity-50">
        <TitlePageCartoEdit />
        <ButtonGroup pill={true} className="mt-2">
          <Button icon={PlusIcon} onClick={zoomIn} />
          <Button icon={MinusIcon} onClick={zoomOut} />
          <Button icon={CameraIcon} onClick={generateThumbnail} />
        </ButtonGroup>
      </div>
      <div
        className="w-full h-full overflow-hidden"
        ref={panZoomCallback}
        data-testid={'map-chart'}
      >
        <ResponsiveChartContainer>
          <BubbleMapChart
            map={{
              geoDomainKey: '__geoCode__',
              valueDomainKey: snapshot.mapDomainKey || '__none__',
              projectionType: snapshot.projection,
              stroke: 'black',
              fill: 'white',
            }}
            bubble={{
              domainKey: snapshot.bubbleDomainKey || '__none__',
              minRadius: snapshot.bubbleDomainKey
                ? snapshot.bubble.minRadius
                : 0,
              maxRadius: snapshot.bubbleDomainKey
                ? snapshot.bubble.maxRadius
                : 0,
              opacity: snapshot.bubble.opacity,
              stroke: 'black',
              strokeWidth: 1,
              colors: snapshot.bubble.colors,
            }}
            padding={{ top: 0, right: 50, bottom: 150, left: 50 }}
            colors={snapshot.colors}
            geoJson={geoJsonData}
            data={rawData}
          />
        </ResponsiveChartContainer>
      </div>
    </div>
  );
};
