import { RawDatum, RawDatumType } from 'interfaces/chart';

/**
 * Given a raw data {x: 1, y: '2', ...} this function returns a map object
 * indicating the type for each key {x: number, y: string, ...}
 */
export const getDataTypeMap = (rawDatum: RawDatum) => {
  return Object.keys(rawDatum).reduce((acc, key) => {
    acc[key] = typeof rawDatum[key];
    return acc;
  }, {} as Record<string, RawDatumType>);
};

/**
 * Returns the first domain key found given a type
 */
export const guessDomainKey = (
  data: RawDatum[],
  type: 'number' | 'string',
  fallbackIndex: number
) => {
  const firstDatum = data[0] || {};
  const keys = Object.keys(firstDatum);
  const typeMap = getDataTypeMap(firstDatum);
  const [candidateKey] =
    Object.entries(typeMap).find(([, value]) => {
      return value === type;
    }) || [];
  return candidateKey || keys[fallbackIndex] || 'id';
};
