import { RawDatum } from 'interfaces/chart';

/**
 *	Comparator function used to sort values in ascending order.
 */
export const ascending = (a: number, b: number) => {
  return a - b;
};

/**
* FUNCTION: quantile( arr, prob[, opts] )
*	Computes a quantile for a numeric array.
*
* @private
* @param {Array} arr - 1d array
* @param {Number} prob - quantile prob [0,1]
* @param {Object} [opts] - method options:
	`method`: method used to interpolate a quantile value
	`sorted`: boolean flag indicating if the input array is sorted
* @returns {Number} quantile value
*/
export const quantile = (
  arr: number[],
  p: number,
  opts: { method?: string; sorted?: boolean } = {}
) => {
  if (!Array.isArray(arr)) {
    throw new TypeError(
      'quantile()::invalid input argument. First argument must be an array.'
    );
  }
  if (typeof p !== 'number' || p !== p) {
    throw new TypeError(
      'quantile()::invalid input argument. Quantile probability must be numeric.'
    );
  }
  if (p < 0 || p > 1) {
    throw new TypeError(
      'quantile()::invalid input argument. Quantile probability must be on the interval [0,1].'
    );
  }

  if (!(typeof opts === 'object')) {
    throw new TypeError(
      'quantile()::invalid input argument. Options must be an object.'
    );
  }
  if ('sorted' in opts && typeof opts.sorted !== 'boolean') {
    throw new TypeError(
      'quantile()::invalid input argument. Sorted flag must be a boolean.'
    );
  }
  if ('method' in opts && typeof opts.method !== 'string') {
    throw new TypeError(
      'quantile()::invalid input argument. Method must be a string.'
    );
  }

  const len = arr.length;
  let id;

  if (!opts.sorted) {
    arr = arr.slice();
    arr.sort(ascending);
  }

  // Cases...

  // [0] 0th percentile is the minimum value...
  if (p === 0.0) {
    return arr[0];
  }
  // [1] 100th percentile is the maximum value...
  if (p === 1.0) {
    return arr[len - 1];
  }
  // Calculate the vector index marking the quantile:
  id = len * p - 1;

  // [2] Is the index an integer?
  if (id === Math.floor(id)) {
    // Value is the average between the value at id and id+1:
    return (arr[id] + arr[id + 1]) / 2.0;
  }
  // [3] Round up to the next index:
  id = Math.ceil(id);
  return arr[id];
};

export const getQuantileRanges = (
  data: RawDatum[],
  domainKey: string,
  quantiles: number
) => {
  const values = data.map((datum) => datum[domainKey] as number);
  const [min, max] = [Math.min(...values), Math.max(...values)];
  const ranges = Array.from(
    { length: quantiles },
    (_, i) => (i + 1) / quantiles
  )
    .map((q) => {
      return quantile(values, q);
    })
    .map((q, idx, self) => {
      return [idx === 0 ? min : q, idx > quantiles - 1 ? max : self[idx + 1]];
    });
  return ranges;
};
