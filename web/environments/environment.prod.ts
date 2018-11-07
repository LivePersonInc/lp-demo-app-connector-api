export const environment = {
  production: true,
  server: location.hostname,
  protocol: "https",
  port: "",
  //Services names to get the domain with the CSDS
  authentication: "agentVep",
  installation:"accountConfigReadWrite",
  ums:"asyncMessagingEnt",
  account: "accountConfigReadWrite",
  history: "msgHist"

};
