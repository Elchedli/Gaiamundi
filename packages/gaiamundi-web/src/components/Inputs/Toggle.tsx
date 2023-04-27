import { Switch } from '@headlessui/react';
import { useState } from 'react';

interface ToggleSwitchProps {
  label: string;
  defaultChecked: boolean;
  onChange: (state: boolean) => void;
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  label,
  defaultChecked,
  onChange,
}) => {
  const [enabled, setEnabled] = useState(defaultChecked);

  const handleChange = () => {
    const value = !enabled;
    setEnabled(value);
    onChange(value);
  };

  return (
    <Switch.Group>
      <div className="flex items-center">
        <Switch
          checked={enabled}
          onChange={handleChange}
          className={`${
            enabled ? 'bg-blue-600' : 'bg-gray-200'
          } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
        >
          <span
            className={`${
              enabled ? 'translate-x-6' : 'translate-x-1'
            } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
          />
        </Switch>
        <Switch.Label className="ml-4 cursor-pointer">{label}</Switch.Label>
      </div>
    </Switch.Group>
  );
};
