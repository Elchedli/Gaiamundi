import { parse } from 'equation-parser';
import { resolve } from 'equation-resolver';

export const solveEquation = (equation: string) => {
  try {
    //make a string to EquationNode so we can work with resolve function
    const node = parse(equation);
    //this return an object with name and value, for the second parameter you can put a custom mathematical function but we are using general math equations.
    const result = resolve(node, {});
    //if is needed so typescript can check that value does exist.
    if ('value' in result) return result.value;
    else return '';
  } catch (error) {
    return '';
  }
};
