
export class ChatMessage {
  type: MessageType;
  timestamp: string;
  message: string;
  userName: string;
  status: string;
  showUser: boolean;
  sequence: number;

  constructor(type, timestamp, message, userName, status, showUser, sequence) {
    this.type = type;
    this.timestamp = timestamp;
    this.message = message;
    this.userName = userName;
    this.status = status;
    this.showUser = showUser;
    this.sequence = sequence;
  }


}

export enum MessageType{
  sent,
  received
}
