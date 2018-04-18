
export class PushNotificationData {
  public serviceName;
  public certName;
  public token;

  constructor(serviceName, certName, token) {
    this.serviceName = serviceName;
    this.certName = certName;
    this.token = token;
  }
}

