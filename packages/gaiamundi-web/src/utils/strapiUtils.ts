import { ApiData } from 'interfaces/api';

export function groupByApiData<T>(
  arr: ApiData<T>[],
  keyGetter: (data: ApiData<T>) => string
) {
  return arr.reduce((acc, data) => {
    const key = keyGetter(data);
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(data);
    return acc;
  }, {} as { [key: string]: ApiData<T>[] });
}
