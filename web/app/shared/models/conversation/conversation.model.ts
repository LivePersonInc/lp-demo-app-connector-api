import {ChatMessage} from "./chatMessage.model";
import {EventSourcePolyfill} from 'ng-event-source';
import {Deserializable} from "../deserializable.model";

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
    this.serverNotifications = [];
    this.ext_consumer_id = "random_id" + Math.random();
  }

  deserialize(input: any): Conversation {
    Object.assign(this, input);
    input.eventSource = null;
    this.messages = [];
    if(input.messages){
      input.messages.forEach( message => {
        input.messages.push(new ChatMessage(null, null, null, null, null, null).deserialize(message));
      });
    }

    return this;
  }

}
