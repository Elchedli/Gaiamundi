module.exports = ({ env }) => ({
  // ...

  /**
   * TO-DO:
   * for now we are sending from a personal email
   *
   */
  email: {
    config: {
      provider: "sendgrid", // For community providers pass the full package name (e.g. provider: 'strapi-provider-email-mandrill')
      providerOptions: {
        apiKey: env("SENDGRID_API_KEY"),
      },
      settings: {
        defaultFrom: env("SENDGRID_EMAIL"),
        defaultReplyTo: env("SENDGRID_EMAIL"),
      },
    },
  },
  // routes: [
  //   {
  //     method: "POST",
  //     path: "/email",
  //     handler: "email.send",
  //     config: {
  //       roles: ["authenticated"],
  //     },
  //   },
  // ],
  // enable ck editor in admin
  ckeditor: true,
  // strip attributes and data from responses
  transformer: {
    enabled: true,
    config: {
      responseTransforms: {
        removeAttributesKey: true,
        removeDataKey: true,
      },
    },
  },
  // ...
});
