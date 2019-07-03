
export class PublishContentEvent {
  public dialogId;
  public conversationId;
  public event;
  constructor(dialogId, conversationId, event) {
    this.dialogId = dialogId;
    this.conversationId = conversationId;
    this.event = event;
  }
}

