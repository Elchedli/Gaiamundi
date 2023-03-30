import config from 'config';
import { ApiData } from 'interfaces/api';

export const groupByApiData = <T>(
  arr: ApiData<T>[],
  keyGetter: (data: ApiData<T>) => string
) => {
  return arr.reduce((acc, data) => {
    const key = keyGetter(data);
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(data);
    return acc;
  }, {} as { [key: string]: ApiData<T>[] });
};

export const fetchConvertedCsv = async (id: number) => {
  return fetch(`${config.API_URL}/api/page-cartos/${id}/data`)
    .then((response) => response.json())
    .then((data) => data);
};
