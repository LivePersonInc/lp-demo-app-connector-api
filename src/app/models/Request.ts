
export class Request {
  public kind;
  public id;
  public type;
  public body;
  constructor(kind, id, type, body) {
    this.kind = kind || "req";
    this.id = id;
    this.type = type;
    this.body = body;
  }
}

