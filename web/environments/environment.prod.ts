export const environment = {
  production: true,
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
