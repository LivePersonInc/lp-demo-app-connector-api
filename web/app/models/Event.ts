
export class Event {
  public type;
  public contentType;
  public message;
  constructor(type, contentType, message) {
    this.type = type;
    this.contentType = contentType;
    this.message = message;
  }
}

