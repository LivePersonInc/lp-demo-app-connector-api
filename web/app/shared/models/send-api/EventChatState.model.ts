
export class EventChatState {
  public type;
  public chatState: ChatState;
  public sequenceList: Array<number>
  constructor(type, chatState: ChatState, sequenceList:Array<number>) {
    this.type = type;
    this.chatState = chatState;
    this.chatState = sequenceList || [];
  }
}

export enum ChatState{
  ACTIVE,
  INACTIVE,
  GONE,
  COMPOSING,
  PAUSE
}
