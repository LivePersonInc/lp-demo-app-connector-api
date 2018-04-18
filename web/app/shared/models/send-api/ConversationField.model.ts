
export  class ConversationField {
  public field;
  public conversationState;
  constructor(field, conversationState) {
    this.field = field || "ConversationStateField";
    this.conversationState = conversationState;
  }
}

