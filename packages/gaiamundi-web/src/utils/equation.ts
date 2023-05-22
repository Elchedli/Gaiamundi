import { parse } from 'equation-parser';
import { resolve } from 'equation-resolver';
import { ApiData } from 'interfaces/api';
import { RawDatum } from 'interfaces/chart';
import { Indicator } from 'interfaces/indicator';

export const calculateEquation = (equation: string) => {
  try {
    // Make a string to EquationNode so we can work with resolve function
    const node = parse(equation);
    // This return an object with name and value, for the second parameter you can put a custom mathematical function but we are using general math equations.
    const result = resolve(node, {});
    // If is needed so typescript can check that value does exist.
    if ('value' in result) return result.value;
    else return NaN;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(`Unabled to calculate equation ${equation}`, error);
    return NaN;
  }
};

export const calculateIndicator = (
  indicator: ApiData<Indicator>,
  datum: RawDatum
) => {
  const equation = indicator.variables.reduce((formula, variable) => {
    return formula.replaceAll(variable.alias, datum[variable.columnName]);
  }, indicator.equation);
  return calculateEquation(equation);
};
