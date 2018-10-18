export const environment = {
  production: false,
  server: location.hostname,
  protocol: "http",
  port: "8282",
  //Services names to get the domain with the CSDS
  authentication: "agentVep",
  installation:"accountConfigReadWrite",
  ums:"asyncMessagingEnt",
  account: "accountConfigReadWrite",
  history: "msgHist"
};
