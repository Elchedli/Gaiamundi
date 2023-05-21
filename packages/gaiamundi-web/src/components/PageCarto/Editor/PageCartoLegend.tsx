import 'eazychart-css';
import { FC, useMemo } from 'react';

import Well from 'components/Layout/Well';
import { useData } from 'hooks/useData';
import { useSnapshot } from 'hooks/useSnapshot';
import { RawDatum } from 'interfaces/chart';
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
  rawData: RawDatum[];
  domainKey?: string;
  colors: string[];
}> = ({ rawData, domainKey, colors }) => {
  const quantiles = useMemo(
    () =>
      domainKey ? getQuantileRanges(rawData, domainKey, colors.length + 1) : [],
    [rawData, domainKey, colors]
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
  const { rawData } = useData();
  const snapshot = useSnapshot();

  return (
    <div className="flex">
      <MapLegend
        rawData={rawData}
        domainKey={snapshot.mapDomainKey}
        colors={snapshot.colors}
      />
      <MapLegend
        rawData={rawData}
        domainKey={snapshot.bubbleDomainKey}
        colors={snapshot.bubble.colors}
      />
    </div>
  );
};
