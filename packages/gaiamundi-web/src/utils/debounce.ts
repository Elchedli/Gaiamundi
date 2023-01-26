interface IFunction extends Function {
  test?: string;
}
export function debounce(func: IFunction, timeout = 300) {
  const self = null;
  let timer: number;
  return (...args: any) => {
    if (typeof window !== 'undefined') {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        func.apply(self, args);
      }, timeout);
    } else {
      func.apply(self, args);
    }
  };
}
