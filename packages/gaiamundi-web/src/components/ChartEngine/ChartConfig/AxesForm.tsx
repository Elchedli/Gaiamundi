import { AxisConfig, Direction, Position } from 'eazychart-core';

import { Label } from 'components/Inputs/Label';
import { ListBoxInput } from 'components/Inputs/ListBoxInput';
import { Radio, RadioProps } from 'components/Inputs/Radio';
import { useAllowedDataKeys } from 'hooks/useAllowedDataKeys';
import { useChart } from 'hooks/useChartConfig';
import * as React from 'react';
import { ChangeEventHandler, useState } from 'react';

interface AxisPositionRadioProps extends RadioProps {
  position: Position;
  direction: Direction;
  name?: string | '';
}

const AxisPositionRadio: React.FC<AxisPositionRadioProps> = ({
  position,
  direction,
  name,
  ...rest
}) => {
  const label = position.charAt(0).toUpperCase() + position.slice(1);
  const id = `axis-${position}`;
  return (
    <div className="flex items-center gap-2">
      <Radio
        id={id}
        name={`${name}-axis-${direction}`}
        value={position}
        {...rest}
      />
      <Label htmlFor={id}>{label}</Label>
    </div>
  );
};

interface AxisConfigFormProps {
  defaultAxis: AxisConfig;
  direction: Direction;
  name?: string;
  onChange: (axis: AxisConfig) => void;
}

export const AxisForm: React.FC<AxisConfigFormProps> = ({
  defaultAxis,
  direction,
  onChange,
  name,
}) => {
  const [axis, setAxis] = useState(defaultAxis);
  const { domainKeyOptions } = useAllowedDataKeys();
  const updateAxis = (config: Partial<AxisConfig>) => {
    const newAxis = {
      ...axis,
      ...config,
    };
    setAxis(newAxis);
    onChange(newAxis);
  };

  const handleAxisPositionUpdate: ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    const position = e.currentTarget.value as Position;
    updateAxis({
      position,
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <ListBoxInput<string>
          defaultValue={defaultAxis.domainKey}
          options={domainKeyOptions}
          onChange={(domainKey: string) => {
            updateAxis({
              domainKey,
            });
          }}
        />
      </div>
      <div className="flex flex-row gap-4">
        <Label>Position</Label>
        {direction === Direction.HORIZONTAL ? (
          <>
            <AxisPositionRadio
              position={Position.TOP}
              direction={direction}
              name={name}
              onChange={handleAxisPositionUpdate}
              checked={axis.position === Position.TOP}
            />
            <AxisPositionRadio
              position={Position.BOTTOM}
              direction={direction}
              name={name}
              onChange={handleAxisPositionUpdate}
              checked={axis.position === Position.BOTTOM}
            />
          </>
        ) : (
          <>
            <AxisPositionRadio
              position={Position.LEFT}
              direction={direction}
              name={name}
              onChange={handleAxisPositionUpdate}
              checked={axis.position === Position.LEFT}
            />
            <AxisPositionRadio
              position={Position.RIGHT}
              direction={direction}
              name={name}
              onChange={handleAxisPositionUpdate}
              checked={axis.position === Position.RIGHT}
            />
          </>
        )}
      </div>
    </div>
  );
};

export const AxesForm = () => {
  const {
    chart: {
      props: { xAxis, yAxis, yLineAxis },
      type,
    },
    updateChartProps,
  } = useChart();

  return (
    <form>
      <div className="flex flex-col gap-4">
        <div>
          <h3 className="mb-2">Horizontal Axis</h3>
          <AxisForm
            defaultAxis={xAxis}
            name={'xAxis'}
            direction={Direction.HORIZONTAL}
            onChange={(xAxis) => {
              updateChartProps({
                xAxis,
              });
            }}
          />
        </div>
        <hr />
        <div>
          <h3 className="mb-2">Vertical Axis</h3>
          <AxisForm
            defaultAxis={yAxis}
            name={'yAxis'}
            direction={Direction.VERTICAL}
            onChange={(yAxis) => {
              updateChartProps({
                yAxis,
              });
            }}
          />
        </div>
        {type === 'lineColumn' && (
          <>
            <hr />
            <div>
              <h3 className="mb-2">Line Vertical Axis</h3>
              <AxisForm
                defaultAxis={yLineAxis}
                name={'lineAxis'}
                direction={Direction.VERTICAL}
                onChange={(yLineAxis) => {
                  updateChartProps({
                    yLineAxis,
                  });
                }}
              />
            </div>
          </>
        )}
      </div>
    </form>
  );
};
