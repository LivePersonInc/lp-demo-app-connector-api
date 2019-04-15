//TODO: Seb - new dialogState model
export  class DialogState {
  public dialogId;
  public state;
  public closedCause;
  constructor(dialogId, state, closedCause) {
    this.dialogId = dialogId;
    this.state = state;
    this.closedCause = closedCause;
  }
}
