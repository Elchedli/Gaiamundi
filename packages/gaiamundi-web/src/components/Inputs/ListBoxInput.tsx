import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/24/solid';
import classNames from 'classnames';
import { Fragment, useEffect, useMemo, useState } from 'react';

type ListBoxInputProps<T> = {
  className?: string;
  defaultValue: T;
  options: Array<{
    value: T;
    label: string;
  }>;
  onChange: (value: T) => void;
};

export const ListBoxInput = <T extends string | number | symbol>({
  className,
  defaultValue,
  options,
  onChange,
}: ListBoxInputProps<T>) => {
  const [selected, setSelected] = useState(defaultValue);

  const handleSelect = (value: T) => {
    setSelected(value);
    onChange(value);
  };

  useEffect(() => {
    setSelected(defaultValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValue]);

  const selectedOption = useMemo(
    () => options.find((item) => item.value === selected),
    [options, selected]
  );
  const selectedLabel = selectedOption?.label;
  return (
    <div className={classNames(className, 'relative')}>
      <Listbox value={selected} onChange={handleSelect}>
        <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-10 text-left border shadow-sm focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
          <span className="block truncate">{selectedLabel}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {options.map(({ value, label }) => (
              <Listbox.Option
                key={value.toString()}
                value={value}
                data-testid="list-boxinput"
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? 'bg-lime-100 text-lime-900' : 'text-gray-900'
                  }`
                }
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? 'font-medium' : 'font-normal'
                      }`}
                    >
                      {label}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-lime-600">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </Listbox>
    </div>
  );
};
