export const EMAIL_REGEX = /\S+@\S+\.\S+/;

export const getCharRange = (start: string, stop: string) => {
  const result = [];
  for (
    let idx = start.charCodeAt(0), end = stop.charCodeAt(0);
    idx <= end;
    ++idx
  ) {
    result.push(String.fromCharCode(idx));
  }
  return result;
};
