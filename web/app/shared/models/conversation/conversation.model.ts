import {ChatMessage} from "./chatMessage.model";
import {EventSourcePolyfill} from 'ng-event-source';
import {Deserializable} from "../deserializable.model";
import {getNonAotConfig} from "@angular/cli/models/webpack-configs";

export class Conversation implements Deserializable<Conversation> {
  isConvStarted: boolean;
  appJWT: string;
  consumerJWS: string;
  branId: string;
  appKey: string;
  appSecret: string;
  ext_consumer_id: string;
  conversationId: string;
  userName: string;
  eventSource: EventSourcePolyfill;
  messages: Array<ChatMessage>;
  serverNotifications: Array<string>;

  constructor( brandId:string, appKey: string, appSecret: string,  userName: string) {
    this.branId = brandId;
    this.appKey = appKey;
    this.appSecret = appSecret;
    this.userName = userName;
    this.messages = [];
    this.eventSource = null;
    this.serverNotifications = [];
    this.ext_consumer_id = "random_id" + Math.random();
  }

  deserialize(input: any): Conversation {
    this.isConvStarted = input.isConvStarted;
    this.appJWT = input.appJWT;
    this.consumerJWS = input.consumerJWS;
    this.branId = input.branId;
    this.appKey = input.appKey;
    this.appSecret = input.appSecret;
    this.ext_consumer_id = input.ext_consumer_id;
    this.conversationId = input.conversationId;
    this.userName = input.userName;
    this.eventSource = null;

    if(input.messages){
      this.messages = [];
      input.messages.forEach( message => {
        this.messages.push(new ChatMessage(message.type, message.timestamp, message.message, message.userName, message.status, message.showUser));
      });
    }

    this.serverNotifications = input.serverNotifications;

    return this;
  }

}
