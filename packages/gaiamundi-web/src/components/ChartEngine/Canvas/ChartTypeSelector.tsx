import { Card } from 'components/Card/Card';
import { Tooltip } from 'components/Floating/Tooltip';
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
    <div className="grid grid-cols-8 gap-2 my-2">
      {Object.entries(CHART_TYPES).map(([type, { Icon }]) => {
        return (
          <Card
            className="p-2 cursor-pointer items-center"
            onClick={() => handleClick(type as ChartType)}
            title={type}
            key={type}
          >
            <Tooltip content={type}>
              <Icon width={48} height={48} />
            </Tooltip>
          </Card>
        );
      })}
    </div>
  );
};
