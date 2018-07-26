export class ChatMessage {
  type: MessageType;
  timestamp: string;
  message: string;
  userName: string;
  status: string;
  showUser: boolean;

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
