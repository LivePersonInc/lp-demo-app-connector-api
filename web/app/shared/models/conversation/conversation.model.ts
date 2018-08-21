import {ChatMessage} from "./chatMessage.model";
import {EventSourcePolyfill} from 'ng-event-source';

export class Conversation {
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
    this.ext_consumer_id = "ramdom_id" + Math.random();
  }

}
