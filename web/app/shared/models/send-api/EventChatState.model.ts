
export class EventChatState {
  type;
  chatState: string;
  constructor(chatState: ChatState) {
    this.type = "ChatStateEvent";
    this.chatState = ChatState[chatState];
  }
}

export enum ChatState{
  ACTIVE,
  INACTIVE,
  GONE,
  COMPOSING,
  PAUSE
}
