//TODO: Seb - new dialogChange model
export  class DialogChange {
  public field;
  public type;
  public dialog;
  constructor(field, type, dialog) {
    this.field = field;
    this.type = type;
    this.dialog = dialog;
  }
}
