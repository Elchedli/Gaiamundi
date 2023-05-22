export const getUrlQueryParam = (
  router: any,
  paramName: string
): string | null => {
  if (paramName in router.query && router.query[paramName]) {
    const param = router.query[paramName];
    if (Array.isArray(param)) {
      return param.length > 0 ? param[0] : null;
    } else {
      return param;
    }
  }
  return null;
};
