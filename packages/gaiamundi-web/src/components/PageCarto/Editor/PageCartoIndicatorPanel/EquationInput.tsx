import { ListBoxInput } from 'components/Inputs/ListBoxInput';
import { TextInput } from 'components/Inputs/TextInput';
import { LoadingMessage } from 'components/Loader/LoadingMessage';
import { defaultFunctions, defaultVariables } from 'equation-resolver';
import React, { ChangeEventHandler, useRef, useState } from 'react';
import {
  defaultErrorHandler,
  EquationContext,
  EquationOptions,
} from 'react-equation';
import { useQuery } from 'react-query';
import { getEquations } from 'services/equation';

type EquationInputProps = {
  onChange: ChangeEventHandler<HTMLInputElement>;
};

const EquationInput = React.forwardRef<HTMLDivElement, EquationInputProps>(
  ({ onChange }, ref) => {
    const [formula, setFormula] = useState('a');
    const inputRef = useRef<HTMLInputElement>(null);
    const { data: response, isLoading } = useQuery({
      queryKey: ['equations'],
      queryFn: async () => {
        return await getEquations();
      },
      keepPreviousData: true,
      onSuccess(response) {
        const defaultValue = response.data.length
          ? response.data[0].attributes.value
          : null;
        if (defaultValue) {
          setFormula(defaultValue);
        }
      },
    });

    if (isLoading) {
      return <LoadingMessage />;
    }

    const options = (response?.data || []).map(({ attributes }) => attributes);
    const defaultValue = options.length ? options[0].value : 'a';

    const handleEquationSelect = (selectedFormula: string) => {
      setFormula(selectedFormula);
      if (inputRef.current) {
        inputRef.current.value = selectedFormula;
      }
    };

    const handleEquationUpdate: ChangeEventHandler<HTMLInputElement> = (e) => {
      setFormula(e.target.value);
      onChange(e);
    };

    return (
      <div ref={ref}>
        <ListBoxInput
          className="mb-2"
          defaultValue={defaultValue}
          options={options}
          onChange={handleEquationSelect}
        />
        <TextInput
          ref={inputRef}
          id="equation"
          className="w-full"
          onChange={handleEquationUpdate}
          defaultValue={formula}
        />
        <EquationOptions
          variables={defaultVariables}
          functions={defaultFunctions}
          errorHandler={defaultErrorHandler}
        >
          <EquationContext
            render={(equation) => (
              <div style={{ fontSize: '150%' }}>{equation(`${formula} =`)}</div>
            )}
          />
        </EquationOptions>
      </div>
    );
  }
);

EquationInput.displayName = 'EquationInput';

export default EquationInput;
