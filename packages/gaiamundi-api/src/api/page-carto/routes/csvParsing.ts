module.exports = {
  routes: [
    {
      method: "GET",
      path: "/page-carto/csv/parsing/:id",
      handler: "page-carto.csvParsing",
    },
  ],
};
