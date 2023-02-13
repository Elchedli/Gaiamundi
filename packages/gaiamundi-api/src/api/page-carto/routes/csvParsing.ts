module.exports = {
  routes: [
    {
      method: "GET",
      path: "/pagecarto/:id/data",
      handler: "page-carto.get",
    },
  ],
};
