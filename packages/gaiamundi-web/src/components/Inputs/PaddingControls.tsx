import { ChartPadding } from 'eazychart-core';
import * as React from 'react';
import { useState } from 'react';

import { TextInput } from 'components/Inputs/TextInput';

type PaddingControlsProps = {
  defaultPaddings: ChartPadding;
  onChange: (padding: ChartPadding) => void;
};

export const PaddingControls: React.FC<PaddingControlsProps> = ({
  defaultPaddings,
  onChange,
}) => {
  const [padding, setPadding] = useState<ChartPadding>(defaultPaddings);

  const updatePadding = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: 'top' | 'left' | 'right' | 'bottom'
  ) => {
    const changedPadding = parseInt(e.target.value);
    const newPadding = {
      ...padding,
      [key]: !isNaN(changedPadding) ? changedPadding : 0,
    };
    setPadding({ ...newPadding });
    onChange(newPadding);
  };

  return (
    <div>
      <div className="flex flex-col items-center">
        <label htmlFor="padding-top">Top</label>
        <div className="w-6/12 ">
          <TextInput
            addon={'px'}
            id="padding-top"
            className="w-full focus:outline-none"
            sizing="sm"
            value={padding.top}
            onChange={(e) => updatePadding(e, 'top')}
          />
        </div>
      </div>
      <div className="flex justify-around 	gap-6 mt-3">
        <div className="flex flex-col items-center">
          <label htmlFor="padding-left">Left</label>
          <div className="w-full  ">
            <TextInput
              addon={'px'}
              id="padding-left"
              className="w-full focus:outline-none"
              sizing="sm"
              value={padding.left}
              onChange={(e) => updatePadding(e, 'left')}
            />
          </div>
        </div>
        <div className="flex flex-col items-center">
          <label htmlFor="padding-right">Right</label>
          <div className="w-full">
            <TextInput
              addon={'px'}
              id="padding-left"
              className="w-full focus:outline-none"
              sizing="sm"
              value={padding.right}
              onChange={(e) => updatePadding(e, 'right')}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center mt-3">
        <label htmlFor="padding-bottom">Bottom</label>
        <div className="w-6/12">
          <TextInput
            addon={'px'}
            id="padding-bottom"
            className="w-full focus:outline-none"
            sizing="sm"
            value={padding.bottom}
            name="padding-bot"
            onChange={(e) => updatePadding(e, 'bottom')}
          />
        </div>
      </div>
    </div>
  );
};
