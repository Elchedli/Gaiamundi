import { useOnClickOutside } from 'hooks/useClickOutside';
import { useCallback, useRef, useState } from 'react';
import { RgbaStringColorPicker } from 'react-colorful';

interface ColorPickerProps {
  defaultColor: string;
  showLabel?: boolean;
  onChange: (color: string) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
  defaultColor,
  showLabel = true,
  onChange,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [color, setColor] = useState(defaultColor);
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => setIsVisible(false));

  const toggleVisiblity = useCallback(() => {
    setIsVisible(!isVisible);
  }, [setIsVisible, isVisible]);

  const handleChange = (color: string) => {
    setColor(color);
    onChange(color);
  };

  return (
    <div className="relative">
      <div className="flex items-center">
        <div
          className="rounded-lg shadow-sm w-[42px] h-[42px] border border-gray-200 cursor-pointer"
          style={{ backgroundColor: color }}
          onClick={toggleVisiblity}
        >
          &nbsp;
        </div>
        {showLabel && <div className="ml-4">{color}</div>}
      </div>

      {isVisible && (
        <div className="absolute z-50 top-3 left-3 shadow-md" ref={ref}>
          <RgbaStringColorPicker color={color} onChange={handleChange} />
        </div>
      )}
    </div>
  );
};
