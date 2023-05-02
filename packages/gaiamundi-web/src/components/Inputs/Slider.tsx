import classNames from 'classnames';
import * as React from 'react';

import { TextInput } from 'components/Inputs/TextInput';

type Size = 'sm' | 'md' | 'lg';

type SliderProps = {
  defaultValue: number;
  step?: string;
  size?: Size;
  minValue?: number;
  maxValue?: number;
  label?: string;
  unit?: string;
  onChange: (slider: number) => void;
};
const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);
export const Slider: React.FC<SliderProps> = ({
  defaultValue,
  label,
  onChange,
  size = 'lg',
  minValue = 0,
  maxValue = Infinity,
  step = 1,
  unit = '',
}) => {
  const [value, setValue] = React.useState(
    clamp(defaultValue, minValue, maxValue)
  );

  const parseNumber = (value: string) => {
    const parsedValue = parseFloat(value);
    return !isNaN(parsedValue) ? parsedValue : 0;
  };

  const updateSliderValue: React.FocusEventHandler<HTMLInputElement> = (e) => {
    const newValue = parseNumber(e.target.value);
    setValue(clamp(newValue, minValue, maxValue));
    onChange(newValue);
  };

  const handleTextInput: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(parseNumber(e.target.value));
  };

  return (
    <div className="flex flex-row">
      <div className="w-full flex-grow">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
          {label}
        </label>
        <input
          min={minValue}
          max={maxValue}
          type="range"
          step={step}
          value={value.toString()}
          onChange={updateSliderValue}
          className={classNames(
            'mb-2 w-full bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700',
            {
              'h-1': size === 'sm',
              'h-2': size === 'md',
              'h-3': size === 'lg',
            }
          )}
          data-testid="slider"
        />
        <ul className="flex justify-between w-full">
          <li className="flex justify-center relative">
            {`${minValue.toFixed(0)}${unit}`}
          </li>
          <li className="flex justify-center relative">
            {`${maxValue.toFixed(0)}${unit}`}
          </li>
        </ul>
      </div>
      <div className="w-2/12  ml-3">
        <TextInput
          sizing="sm"
          className="w-full"
          value={value.toString()}
          onChange={handleTextInput}
          onBlur={updateSliderValue}
          data-testid="slider-text-input"
        />
      </div>
    </div>
  );
};
