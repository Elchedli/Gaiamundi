export function debounce(func: (searchTerm: string) => void, timeout = 300) {
  let timer: NodeJS.Timeout;
  return (searchTerm: string) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func(searchTerm);
    }, timeout);
  };
}
