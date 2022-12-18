import { useState, useEffect } from 'react';

export const useLocalStorageState = (key: string) => {
  const [value, setValue] = useState<string>('');

  const persistValue = (newValue: string) => {
    if (newValue !== value) {
      setValue(newValue);
      return localStorage.setItem(key, newValue);
    }
    return value;
  };

  useEffect(() => {
    const item = localStorage.getItem(key);
    if (item) {
      setValue(item);
    }
  }, []);

  return { value, persistValue };
};
