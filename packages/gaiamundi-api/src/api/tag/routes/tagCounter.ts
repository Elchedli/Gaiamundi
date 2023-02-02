module.exports = {
  routes: [
    {
      method: "GET",
      path: "/tag/counter",
      handler: "tag.countItems",
    },
    {
      method: "GET",
      path: "/tag/counter/:id",
      handler: "tag.countItem",
    },
  ],
};
