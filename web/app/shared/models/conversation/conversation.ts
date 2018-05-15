import {Request} from "../send-api/Request.model";
import {ChatMessage} from "./chatMessage.model";
import {EventSourcePolyfill} from 'ng-event-source';

export class Conversation {
  isConvStarted: boolean;
  isLoading: boolean;
  appJWT: string;
  consumerJWS: string;
  branId: string;
  appKey: string;
  appSecret: string;
  ext_consumer_id: string;
  conversationId: string;
  requestConversationPayload: Request;
  setUserProfilePayload:Request;
  sendMsgPayload:Request;
  userName;
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
