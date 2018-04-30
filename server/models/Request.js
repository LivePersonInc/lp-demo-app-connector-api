class Request {
  constructor(kind, id, type, body) {
    this.kind = kind || "req";
    this.id = id;
    this.type = type;
    this.body = body;
  }
}

module.exports = Request;
