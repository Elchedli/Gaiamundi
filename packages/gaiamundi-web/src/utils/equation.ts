import { parse } from 'equation-parser';
import { resolve } from 'equation-resolver';

export const solveEquation = (equation: string) => {
  const node = parse(equation);
  const result = resolve(node, {});
  if ('value' in result) {
    return result.value;
  }
  return null;
};
