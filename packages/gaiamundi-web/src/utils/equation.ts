import { parse } from 'equation-parser';
import { resolve } from 'equation-resolver';

export const solveEquation = (equation: string) => {
  try {
    const node = parse(equation);
    const result = resolve(node, {});
    if ('value' in result) {
      return result.value;
    }
  } catch (error) {
    return '';
  }
};
