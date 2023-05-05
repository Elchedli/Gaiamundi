module.exports = ({ env }) => ({
  routes: [
    {
      method: "POST",
      path: "/email",
      handler: "email.send",
      config: {
        roles: ["authenticated"],
      },
    },
  ],
});
