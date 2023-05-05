module.exports = async ({ strapi }) => {
  const permissionService =
    strapi.plugins["strapi-plugin-server-route-permission"].services.permission;
  try {
    const permission = await permissionService.create({
      service: "email",
      action: "send",
      subject: null,
      fields: null,
      conditions: null,
      role: "authenticated",
      enabled: true,
      isPublic: false,
    });
  } catch (error) {
    console.log("not working");
  }

  console.log("Email sending permission enabled for authenticated users");
};
