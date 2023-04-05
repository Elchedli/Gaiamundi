import { FC, useState } from 'react';
import { PageCartoMap } from './PageCartoMap';
import { PageCartoPanels } from './PageCartoPanels';

export interface chosenIndicatorProps {
  indicatorName: string;
  type: string;
}
export const PageCartoEditor: FC = () => {
  const [chosenIndicator, setchooseIndicator] = useState<chosenIndicatorProps>({
    indicatorName: '',
    type: '',
  });
  const safeChangeIndicator = ({ indicatorName, type }: chosenIndicatorProps) =>
    setchooseIndicator({ indicatorName, type });
  return (
    <div className="grid grid-cols-3 gap-4 h-full">
      <div className="col-span-2">
        <PageCartoMap chosenIndicator={chosenIndicator} />
      </div>
      <div className="col-span">
        <PageCartoPanels
          changeIndicator={(indicatorName: string, type: string) =>
            safeChangeIndicator({ indicatorName, type })
          }
        />
      </div>
    </div>
  );
};
