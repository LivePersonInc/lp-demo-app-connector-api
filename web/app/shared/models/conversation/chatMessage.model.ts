import {Deserializable} from "../deserializable.model";

export class ChatMessage implements Deserializable<ChatMessage>{
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

  deserialize(input: any): ChatMessage {
    Object.assign(this, input);
    return this;
  }

}

export enum MessageType{
  sent,
  received
}
