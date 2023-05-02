import { PlusIcon, XMarkIcon as XIcon } from '@heroicons/react/24/solid';
import * as React from 'react';
import { useState } from 'react';

import { Button } from 'components/Button/Button';
import { ColorPicker } from 'components/Inputs/ColorPicker';

type MultiColorPickerProps = {
  defaultColors: string[];
  onChange: (colors: string[]) => void;
};

export const MultiColorPicker: React.FC<MultiColorPickerProps> = ({
  defaultColors,
  onChange,
}) => {
  const [colors, setColors] = useState(defaultColors);

  const updateColors = (newColors: string[]) => {
    setColors(newColors);
    onChange(newColors);
  };

  const updateColorAtIndex = (newColor: string, idx: number) => {
    const newColors = [...colors];
    newColors[idx] = newColor;
    updateColors(newColors);
  };

  const removeColorAtIndex = (idx: number) => {
    const newColors = [...colors];
    newColors.splice(idx, 1);
    updateColors(newColors);
  };

  const addColor = () => {
    const lastColor = colors.length > 0 ? colors[colors.length - 1] : '#000';
    const newColors = [...colors, lastColor];
    updateColors(newColors);
  };

  return (
    <div className="grid grid-cols-7 gap-2">
      {colors.map((color, idx) => {
        return (
          <div
            className="relative"
            key={idx}
            data-testid={`color-picker${idx}`}
          >
            <ColorPicker
              showLabel={false}
              defaultColor={color}
              onChange={(c) => {
                updateColorAtIndex(c, idx);
              }}
            />
            <Button
              color="alternative"
              icon={XIcon}
              className="absolute -top-2 -right-1 p-0"
              size={'xs'}
              onClick={() => {
                removeColorAtIndex(idx);
              }}
            />
          </div>
        );
      })}
      <div>
        <Button
          className="shadow-sm"
          color="light"
          icon={PlusIcon}
          onClick={addColor}
          data-testid="add-color-picker-button"
        />
      </div>
    </div>
  );
};
