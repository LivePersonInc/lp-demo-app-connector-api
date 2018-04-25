export class ConversationEvent {
  conversationId: string;
  event: ConvEvent;

  constructor(conversationId:string, event: ConvEvent){
    this.conversationId = conversationId;
    this.event = event;
  }
}

export enum ConvEvent{
  OPEN,
  CLOSE,
  MESSAGE_SENT,
  RESET
}
