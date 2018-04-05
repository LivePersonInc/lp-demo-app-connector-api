export class ChatMessage {
  public type: MessageType;
  public timestamp: string;
  public message: string;
  public userName: string;
  public status: string;
  public showUser: boolean;

  constructor(type, timestamp, message, userName, status, showUser) {
    this.type = type;
    this.timestamp = timestamp;
    this.message = message;
    this.userName = userName;
    this.status = status;
    this.showUser = showUser;
  }
}

export enum MessageType{
  sent,
  received
}
