import { Alert } from 'components/Alert/Alert';
import { ListBoxInput } from 'components/Inputs/ListBoxInput';
import { TextInput } from 'components/Inputs/TextInput';
import { LoadingMessage } from 'components/Loader/LoadingMessage';
import { defaultFunctions, defaultVariables } from 'equation-resolver';
import { IndicatorVariable } from 'interfaces/indicator';
import React, { ChangeEventHandler, FC, useRef, useState } from 'react';
import {
  EquationContext,
  EquationOptions,
  defaultErrorHandler,
} from 'react-equation';
import { useQuery } from 'react-query';
import { getEquations } from 'services/equation';

const VariableList: FC<{ variables: IndicatorVariable[] }> = ({
  variables,
}) => {
  return variables.length ? (
    <Alert type="info">
      <h3 className="underline">Variables :</h3>
      <ul className="italic">
        {variables.map(({ columnName, alias }) => {
          return (
            <li key={alias}>
              <b>{alias} = </b>
              {columnName}
            </li>
          );
        })}
      </ul>
    </Alert>
  ) : (
    <Alert type="failure">{`Veuillez d'abord sélectionner des colonnes`}</Alert>
  );
};

type EquationInputProps = {
  variables: IndicatorVariable[];
  onChange: ChangeEventHandler<HTMLInputElement>;
};

const EquationInput = React.forwardRef<HTMLDivElement, EquationInputProps>(
  ({ variables, onChange }, ref) => {
    const [formula, setFormula] = useState('A');
    const inputRef = useRef<HTMLInputElement>(null);
    const { data: response, isLoading } = useQuery({
      queryKey: ['equations'],
      queryFn: async () => {
        return await getEquations();
      },
      keepPreviousData: true,
      onSuccess(response) {
        const defaultValue = response.data.length
          ? response.data[0].value
          : null;
        if (defaultValue) {
          setFormula(defaultValue);
        }
      },
    });

    if (isLoading) {
      return <LoadingMessage />;
    }

    const options = response?.data || [];
    const defaultValue = options.length ? options[0].value : formula;

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

    const equationVariables = variables.reduce((acc, v) => {
      acc[v.alias] = {
        type: 'number',
        value: 1,
      };
      return acc;
    }, defaultVariables);

    return (
      <div ref={ref}>
        <VariableList variables={variables} />
        <ListBoxInput
          className="mb-2"
          defaultValue={defaultValue}
          options={options}
          onChange={handleEquationSelect}
        />
        <TextInput
          data-testid="equation-input"
          ref={inputRef}
          id="equation"
          className="w-full"
          onChange={handleEquationUpdate}
          defaultValue={formula}
        />
        <EquationOptions
          variables={equationVariables}
          functions={defaultFunctions}
          errorHandler={defaultErrorHandler}
        >
          <EquationContext
            render={(equation) => (
              <div style={{ fontSize: '150%' }}>
                Exemple : {equation(`${formula} =`)}
              </div>
            )}
          />
        </EquationOptions>
      </div>
    );
  }
);

EquationInput.displayName = 'EquationInput';

export default EquationInput;
