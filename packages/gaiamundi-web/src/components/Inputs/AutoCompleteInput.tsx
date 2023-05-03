import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { ApiData } from 'interfaces/api';
import { Fragment, useCallback, useState } from 'react';

type AutoCompleteInputProps<T> = {
  className?: string;
  options: Array<T>;
  labelField: string;
  selectedOption?: T;
  enableComboBox?: boolean;
  placeholder: string;
  emptyMessage?: string;
  onSelect: (value: T) => void;
  onCreate: (value: string) => void;
  inputReference?: React.MutableRefObject<HTMLInputElement | null>;
};

// eslint-disable-next-line @typescript-eslint/ban-types
export const AutoCompleteInput = <T extends ApiData<Object>>({
  className,
  options,
  labelField = 'label',
  selectedOption,
  enableComboBox = true,
  placeholder,
  emptyMessage = 'Nothing found!',
  onSelect,
  onCreate,
  inputReference,
}: AutoCompleteInputProps<T>) => {
  const [query, setQuery] = useState('');

  const filteredOptions =
    query === ''
      ? options
      : options.filter((option) =>
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (option as any)[labelField]
            .toString()
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        );

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (
      (event.code === 'Enter' || event.code === 'NumpadEnter') &&
      query &&
      filteredOptions.length === 0
    ) {
      onCreate(query);
      setQuery('');
    }
  }

  const handleInputRef = useCallback(
    (inputElement: HTMLInputElement | null) => {
      if (inputElement && inputReference) {
        inputReference.current = inputElement;
      }
    },
    [inputReference]
  );

  return (
    <div className={className}>
      <Combobox value={selectedOption} onChange={onSelect}>
        <div className="relative mt-1">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
              displayValue={() => ''}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              data-testid="input"
              ref={handleInputRef}
            />

            {enableComboBox && (
              <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </Combobox.Button>
            )}
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredOptions.length === 0 && query !== '' ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  {emptyMessage}
                </div>
              ) : (
                filteredOptions.map((option) => (
                  <Combobox.Option
                    key={option.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-blue-600 text-white' : 'text-gray-900'
                      }`
                    }
                    value={option}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            (option as any)[labelField]
                          }
                        </span>
                        {selectedOption && selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? 'text-white' : 'text-teal-600'
                            }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};
