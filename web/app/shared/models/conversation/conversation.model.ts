import {ChatMessage} from "./chatMessage.model";
import {EventSourcePolyfill} from 'ng-event-source';
import {Deserializable} from "../deserializable.model";
import {getNonAotConfig} from "@angular/cli/models/webpack-configs";
import {ChatState} from "../send-api/EventChatState.model";
import {SentRequest} from "./sentRequest.model";

export class Conversation implements Deserializable<Conversation> {
  isConvStarted: boolean;
  appJWT: string;
  consumerJWS: string;
  branId: string;
  appKey: string;
  appSecret: string;
  ext_consumer_id: string;
  consumerId: string;
  conversationId: string;
  userName: string;
  eventSource: EventSourcePolyfill;
  messages: Array<ChatMessage>;
  serverNotifications: Array<any>;
  sentRequests: Array<SentRequest>;
  chatState: ChatState;
  features: Array<string>;
  skillId: string;
  context_name: string;

  constructor( brandId:string, appKey: string, appSecret: string,  userName: string) {
    this.branId = brandId;
    this.appKey = appKey;
    this.appSecret = appSecret;
    this.userName = userName;
    this.messages = [];
    this.eventSource = null;
    this.serverNotifications = [];
    this.ext_consumer_id = Math.random().toString();
    this.consumerId = "";
    this.sentRequests = [];
    this.features = [];
    this.skillId = "-1";
    this.features = [];
  }

  deserialize(input: any): Conversation {
    this.isConvStarted = input.isConvStarted;
    this.appJWT = input.appJWT;
    this.consumerJWS = input.consumerJWS;
    this.branId = input.branId;
    this.appKey = input.appKey;
    this.appSecret = input.appSecret;
    this.ext_consumer_id = input.ext_consumer_id;
    this.consumerId = input.consumerId;
    this.conversationId = input.conversationId;
    this.userName = input.userName;
    this.eventSource = null;
    this.chatState = ChatState.ACTIVE;
    this.features = input.features;
    this.skillId = input.skillId;
    this.context_name = input.context_name;

    if(input.messages){
      this.messages = [];
      input.messages.forEach( message => {
        if(message){
          let msg = new ChatMessage(message.type, message.timestamp, message.message, message.userName, message.showUser, message.sequence);
          msg.accepted = message.accepted;
          msg.read = message.read;
          this.messages.push(msg);
        }
      });
    }

    this.serverNotifications = input.serverNotifications;

    return this;
  }

}
