
import {FileMessage} from "./fileMessage.model";

export class ChatMessage {
  type: MessageType;
  timestamp: string;
  message: string;
  userName: string;
  showUser: boolean;
  sequence: number;
  accepted: boolean;
  read:boolean;
  file: FileMessage;

  constructor(type, timestamp, message, userName, showUser, sequence) {
    this.type = type;
    this.timestamp = timestamp;
    this.message = message;
    this.userName = userName;
    this.showUser = showUser;
    this.sequence = sequence;
    this.accepted = false;
    this.read = false;
    this.file = null;
  }

}

export enum MessageType{
  SENT,
  RECEIVED
}
