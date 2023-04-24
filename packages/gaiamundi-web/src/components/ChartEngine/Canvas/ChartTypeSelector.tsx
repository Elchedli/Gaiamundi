import { Card } from 'components/Card/Card';
import { ChartType, CHART_TYPES } from 'interfaces/chart';
import * as React from 'react';

type ChartTypeSelectorProps = {
  onSelect: (type: ChartType) => void;
};

export const ChartTypeSelector: React.FC<ChartTypeSelectorProps> = ({
  onSelect,
}) => {
  const handleClick = (chartType: ChartType) => {
    onSelect(chartType);
  };
  return (
    <div className="grid grid-cols-6 gap-2">
      {Object.entries(CHART_TYPES).map(([type, { Icon }]) => {
        return (
          <Card onClick={() => handleClick(type as ChartType)} key={type}>
            <div>
              <Icon />
            </div>
            <h3 className="font-bold text-center">{type}</h3>
          </Card>
        );
      })}
    </div>
  );
};
