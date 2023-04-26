import classnames from 'classnames';
import {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

interface MultiRangeSliderProps {
  min: number;
  max: number;
  onChange: (range: { min: number; max: number }) => void;
}

const MultiRangeSlider: FC<MultiRangeSliderProps> = ({
  min,
  max,
  onChange,
}) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef<HTMLInputElement>(null);
  const maxValRef = useRef<HTMLInputElement>(null);
  const range = useRef<HTMLDivElement>(null);

  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  const onSettingMinValue = (event: ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(+event.target.value, maxVal - 1);
    setMinVal(value);
    event.target.value = value.toString();
    onChange({ min: minVal, max: maxVal });
  };

  const onSettingMaxValue = (event: ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(+event.target.value, minVal + 1);
    setMaxVal(value);
    event.target.value = value.toString();
    onChange({ min: minVal, max: maxVal });
  };

  useEffect(() => {
    if (maxValRef.current) {
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(+maxValRef.current.value);

      if (range.current) {
        range.current.style.left = `${minPercent}%`;
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [minVal, getPercent]);

  useEffect(() => {
    if (minValRef.current) {
      const minPercent = getPercent(+minValRef.current.value);
      const maxPercent = getPercent(maxVal);

      if (range.current) {
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [maxVal, getPercent]);

  return (
    <div className="mb-4 py-4" data-testid="multi-range-slider">
      <input
        type="range"
        min={min}
        max={max}
        value={minVal}
        ref={minValRef}
        onChange={onSettingMinValue}
        className={classnames('thumb z-30', {
          'z-50': minVal > max - 100,
        })}
        data-testid="min-value-slider"
      />
      <input
        type="range"
        min={min}
        max={max}
        value={maxVal}
        ref={maxValRef}
        onChange={onSettingMaxValue}
        className="thumb z-40"
        data-testid="max-value-slider"
      />

      <div className="relative">
        <div className="slider__track absolute w-full bg-gray-200 z-10 h-[12px] rounded-2xl"></div>
        <div
          ref={range}
          className="slider__range z-20 absolute h-[12px] rounded-2xl"
        ></div>
        <div className=" mt-5 absolute text-sm text-[#6b7280] ">{minVal}</div>
        <div className="-right-[4px] mt-5 absolute text-sm text-[#6b7280]">
          {maxVal}
        </div>
      </div>
    </div>
  );
};

export default MultiRangeSlider;
