import { NormalizedDatum } from 'eazychart-core';
import { LegendProps } from 'eazychart-react';
import React from 'react';

export const Legend: React.FC<LegendProps> = ({
  data,
  toggleDatum,
  ...rest
}) => {
  const handleLegendClick = (d: NormalizedDatum, idx: number) => {
    toggleDatum(d, !d.isActive, idx);
  };

  return (
    <div className="ez-legend mb-4" {...rest}>
      {data?.map((d: NormalizedDatum, idx: number) => {
        return (
          <div
            key={d.id}
            onClick={() => handleLegendClick(d, idx)}
            role="button"
            className={`ez-legend-key ${
              !d.isActive ? 'ez-legend-disable' : ''
            }`}
          >
            <div
              className={`w-4 h-4 inline-block align-middle rounded-full`}
              style={{
                backgroundColor: d.isActive
                  ? (d.color as any as string)
                  : 'rgba(255, 255, 255, 0)',
                border: d.color + ' 2px solid',
              }}
            ></div>
            <span className="ez-legend-text align-middle ml-2">{d.label}</span>
          </div>
        );
      })}
    </div>
  );
};
