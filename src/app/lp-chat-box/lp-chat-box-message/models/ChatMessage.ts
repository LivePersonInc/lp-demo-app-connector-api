export class ChatMessage {
  public type: MessageType;
  public timestamp: string;
  public message: string;
  public userName: string;
  public status: string;

  constructor(type, timestamp, message, userName, status) {
    this.type = type;
    this.timestamp = timestamp;
    this.message = message;
    this.userName = userName;
    this.status = status;
  }
}

export enum MessageType{
  sent,
  received
}
