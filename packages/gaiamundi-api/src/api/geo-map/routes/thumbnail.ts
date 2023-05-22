module.exports = {
  routes: [
    {
      method: "GET",
      path: "/geo-maps/thumbnail/:id",
      handler: "geo-map.thumbnail",
      config: {
        roles: ["public"],
      },
    },
  ],
};
