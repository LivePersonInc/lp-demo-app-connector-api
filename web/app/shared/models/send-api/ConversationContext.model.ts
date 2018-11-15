
export class ConversationContext {
  visitorId:string;
  sessionId:string;
  interactionContextId:number;
  type:string;
  lang:string;
  features:Array<string>;

  constructor(type, features) {
    this.visitorId = "";
    this.sessionId = "";
    this.interactionContextId = 2;
    this.type = type;
    this.lang = "en-US";
    this.features = features;
  }
}


