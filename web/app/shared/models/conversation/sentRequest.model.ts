export class SentRequestModel {
  title: string; //i.e: Open Conversation, Send Row, Close, Get History....
  type: string; //POST, GET..
  payload: any;
  response: any;
  status: number;
  headers: any;

  /*constructor(title: string, type: string, payload: string, response:string, stauts: number) {
    this.title = title;
    this.type = type;
    this.payload = payload;
    this.response = response;
    this.status = stauts;
  }*/
}
