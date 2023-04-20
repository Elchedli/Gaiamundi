import { InformationCircleIcon } from '@heroicons/react/24/solid';
import { Tooltip } from 'components/Floating/Tooltip';
import { GeoProperty } from 'interfaces/geo-map';
interface GeoPropertyProps {
  properties: GeoProperty[];
}
export const GeoMapPopover: React.FC<GeoPropertyProps> = ({ properties }) => {
  return (
    <div
      className="block absolute bottom-0 right-0"
      data-testid="geomap-popover"
    >
      <Tooltip
        style="light"
        content={
          <div className="w-[256px]">
            <h3
              className="text-base font-semibold"
              data-testid="property-title"
            >
              Propriétés
            </h3>
            <ul>
              {properties.map((property, idx) => {
                return (
                  <li key={idx}>
                    <span className="font-semibold" data-testid="property-name">
                      -&nbsp;{property.name}&nbsp;
                      {property.isGeoCode && ' [Géocode]'}
                    </span>
                    &nbsp; (exp.{' '}
                    <span data-testid="property-value">{property.sample}</span>)
                  </li>
                );
              })}
            </ul>
          </div>
        }
      >
        <InformationCircleIcon width={36} height={36} />
      </Tooltip>
    </div>
  );
};
