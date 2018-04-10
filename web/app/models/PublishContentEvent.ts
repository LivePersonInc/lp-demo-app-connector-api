
export class PublishContentEvent {
  public dialogId;
  public event;
  constructor(dialogId, event) {
    this.dialogId = dialogId;
    this.event = event;
  }
}

