import { ColorPicker } from 'components/Inputs/ColorPicker';
import { ToggleSwitch } from 'components/Inputs/Toggle';
import { Direction } from 'eazychart-core';
import { useChartGridConfig } from 'hooks/useChartConfig';

export const GridForm = () => {
  const { grid, updateGridDirection, updateGridColor } = useChartGridConfig();

  return (
    <form>
      <div className="flex flex-col gap-4">
        <div>
          <ToggleSwitch
            label={'Show Horizontal Lines'}
            defaultChecked={grid.directions.includes(Direction.HORIZONTAL)}
            onChange={(isEnabled) =>
              updateGridDirection(Direction.HORIZONTAL, isEnabled)
            }
          />
        </div>
        <div>
          <ToggleSwitch
            label={'Show Vertical Lines'}
            defaultChecked={grid.directions.includes(Direction.VERTICAL)}
            onChange={(isEnabled) =>
              updateGridDirection(Direction.VERTICAL, isEnabled)
            }
          />
        </div>
        <div>
          <ColorPicker defaultColor={grid.color} onChange={updateGridColor} />
        </div>
      </div>
    </form>
  );
};
