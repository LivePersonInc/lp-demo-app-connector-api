
export class EventChatState {
  public type;
  public chatState: ChatState;
  constructor(type, chatState: ChatState) {
    this.type = type;
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
