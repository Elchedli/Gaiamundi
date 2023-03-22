module.exports = {
  routes: [
    {
      method: "GET",
      path: "/geo-maps/thumbnail/:id",
      handler: "geo-map.thumbnail",
    },
    {
      method: "GET",
      path: "/geo-maps/screenshot",
      handler: "geo-map.screenshot",
    },
  ],
};
