import { Card } from 'components/Card/Card';
import { CHART_TYPES, ChartType } from 'interfaces/chart';
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
    <div className="grid grid-cols-8 gap-2">
      {Object.entries(CHART_TYPES).map(([type, { Icon }]) => {
        return (
          <Card onClick={() => handleClick(type as ChartType)} key={type}>
            <div className="h-full">
              <div className="align-middle h-4/6">
                <Icon />
              </div>
              <h3 className="font-bold text-center overflow-clip h-2/6">
                {type}
              </h3>
            </div>
          </Card>
        );
      })}
    </div>
  );
};
