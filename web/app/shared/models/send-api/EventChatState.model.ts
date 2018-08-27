
export class EventChatState {
  public type;
  public chatState: ChatState;
  constructor(chatState: ChatState) {
    this.type = "ChatStateEvent";
    this.chatState = chatState;
  }
}

export enum ChatState{
  ACTIVE,
  INACTIVE,
  GONE,
  COMPOSING,
  PAUSE
}
