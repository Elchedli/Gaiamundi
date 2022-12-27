module.exports = ({ env }) => ({
  // ...

  /**
   * TO-DO:
   * for now we are sending from a personal email
   *
   */
  email: {
    config: {
      provider: 'sendgrid', // For community providers pass the full package name (e.g. provider: 'strapi-provider-email-mandrill')
      providerOptions: {
        apiKey: env('SENDGRID_API_KEY'),
      },
      settings: {
        defaultFrom: env('SENDGRID_EMAIL'),
        defaultReplyTo: env('SENDGRID_EMAIL'),
      },
    },
  },
  ckeditor: true
  // ...
});
