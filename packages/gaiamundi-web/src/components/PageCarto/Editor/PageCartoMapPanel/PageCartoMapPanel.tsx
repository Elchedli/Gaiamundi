import { Label } from 'components/Inputs/Label';
import { ListBoxInput } from 'components/Inputs/ListBoxInput';
import { MultiColorPicker } from 'components/Inputs/MultiColorPicker';
import { Slider } from 'components/Inputs/Slider';
import { usePageCarto } from 'hooks/usePageCarto';
import { useSnapshot } from 'hooks/useSnapshot';
import { GeoProjectionType } from 'interfaces/geojson';
import { FC } from 'react';

const projections: { [key: string]: GeoProjectionType } = {
  geoMercator: 'geoMercator',
  geoTransverseMercator: 'geoTransverseMercator',
  geoOrthographic: 'geoOrthographic',
  geoEqualEarth: 'geoEqualEarth',
  geoEquirectangular: 'geoEquirectangular',
  geoNaturalEarth1: 'geoNaturalEarth1',
  geoAzimuthalEqualArea: 'geoAzimuthalEqualArea',
  geoGnomonic: 'geoGnomonic',
  geoStereographic: 'geoStereographic',
  geoConicConformal: 'geoConicConformal',
  geoConicEqualArea: 'geoConicEqualArea',
  geoConicEquidistant: 'geoConicEquidistant',
};

export const PageCartoMapPanel: FC = () => {
  const { indicators } = usePageCarto();
  const {
    indicatorId,
    updateIndicatorId,
    projection,
    updateProjection,
    colors,
    updateColors,
    bubble,
    updateBubbleConfig,
  } = useSnapshot();

  const projectionOptions = Object.entries(projections).map(
    ([value, label]) =>
      ({
        value,
        label,
      } as { value: GeoProjectionType; label: string })
  );

  const indicatorOptions = [{ value: 0, label: '- Aucun -' }].concat(
    indicators.map(
      ({ id, name }) =>
        ({
          value: id,
          label: name,
        } as { value: number; label: string })
    )
  );

  return (
    <div className="divide-y">
      <div className="my-4">
        <Label>Indicateur du fond</Label>
        <ListBoxInput<number>
          defaultValue={indicatorId}
          options={indicatorOptions}
          onChange={updateIndicatorId}
        />
      </div>
      <div className="my-4">
        <Label>Indicateur du rond</Label>
        <ListBoxInput<number>
          defaultValue={bubble.indicatorId}
          options={indicatorOptions}
          onChange={(id: number) => updateBubbleConfig('indicatorId', id)}
        />
      </div>
      <div className="my-4">
        <Label>Projection</Label>
        <ListBoxInput<GeoProjectionType>
          defaultValue={projection}
          options={projectionOptions}
          onChange={updateProjection}
        />
      </div>
      <div className="my-4">
        <Label>Couleurs de fond</Label>
        <MultiColorPicker defaultColors={colors} onChange={updateColors} />
      </div>
      <div className="my-4">
        <Label>Couleurs de rond</Label>
        <MultiColorPicker
          defaultColors={bubble.colors}
          onChange={(colors) => updateBubbleConfig('colors', colors)}
        />
      </div>
      <div className="my-4">
        <Label>Min. Rayon</Label>
        <Slider
          minValue={0}
          maxValue={bubble.maxRadius}
          step="1"
          size="md"
          onChange={(slider) => updateBubbleConfig('minRadius', slider)}
          defaultValue={bubble.minRadius}
          unit={'px'}
        />
      </div>
      <div className="my-4">
        <Label>Max. Rayon</Label>
        <Slider
          minValue={bubble.minRadius}
          maxValue={100}
          step="1"
          size="md"
          onChange={(slider) => updateBubbleConfig('maxRadius', slider)}
          defaultValue={bubble.maxRadius}
          unit={'%'}
        />
      </div>
      <div className="my-4">
        <Label>Opacité</Label>
        <Slider
          minValue={0}
          maxValue={1}
          step=".01"
          size="md"
          onChange={(slider) => updateBubbleConfig('opacity', slider)}
          defaultValue={bubble.opacity}
          unit={'px'}
        />
      </div>
    </div>
  );
};
