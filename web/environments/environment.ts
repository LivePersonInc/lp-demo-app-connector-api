// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  webhookServer: "https://17ddc37d.ngrok.io/notifications/event",
  server: "localhost:8282",
  idp:"qtvr-wng113.dev.lprnd.net",
  brandId: "le92127075",
  username:"epbot@liveperson.com",
  appKey: "7791627d-ce48-4363-8943-ac9c8fa7ca3b",
  appSecret: "c79p3jifp73ohupjkvirjkfj9e",
  //Services names to get the domain with the CSDS
  authentication: "agentVep",
  installation:"accountConfigReadWrite",
  ums:"asyncMessaging",
  account: "accountConfigReadWrite",


};
