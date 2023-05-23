import Well from 'components/Layout/Well';
import { useData } from 'hooks/useData';
import { useSnapshot } from 'hooks/useSnapshot';
import { RawDatum } from 'interfaces/chart';
import { FC, useMemo } from 'react';
import { getQuantileRanges } from 'utils/quantile';

const LegendColor: FC<{ color: string }> = ({ color }) => {
  return (
    <span
      className={`w-4 h-4 inline-block align-middle rounded-full mr-2`}
      style={{
        backgroundColor: color,
      }}
    ></span>
  );
};

export const MapLegend: FC<{
  data: RawDatum[];
  domainKey?: string;
  colors: string[];
}> = ({ data, domainKey, colors }) => {
  const quantiles = useMemo(
    () =>
      domainKey ? getQuantileRanges(data, domainKey, colors.length + 1) : [],
    [data, domainKey, colors]
  );

  if (quantiles.length === 0) {
    return null;
  }

  return (
    <div className="flex">
      <Well title={domainKey}>
        {colors.map((color, idx) => {
          return (
            <div key={color}>
              <LegendColor color={color} />
              <span>{`[ ${quantiles[idx][0]} - ${quantiles[idx][1]} ]`}</span>
            </div>
          );
        })}
      </Well>
    </div>
  );
};

export const PageCartoLegend: FC = () => {
  const { indicatorData } = useData();
  const snapshot = useSnapshot();

  return (
    <div className="flex gap-2">
      <MapLegend
        data={indicatorData}
        domainKey={snapshot.mapDomainKey}
        colors={snapshot.colors}
      />
      <MapLegend
        data={indicatorData}
        domainKey={snapshot.bubbleDomainKey}
        colors={snapshot.bubble.colors}
      />
    </div>
  );
};
