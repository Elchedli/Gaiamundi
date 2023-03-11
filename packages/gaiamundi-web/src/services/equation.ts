import { Equation } from 'interfaces/equation';
import { ContentType, strapi } from './strapi';

export const getEquations = async () => {
  return await strapi.get<Equation>(ContentType.EQUATION);
};
