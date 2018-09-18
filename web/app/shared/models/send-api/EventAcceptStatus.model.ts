export class EventAcceptStatus {
  public type;
  public status: string;
  public sequenceList: Array<number>
  constructor(status: Status, sequenceList: Array<number>) {
    this.type = "AcceptStatusEvent";
    this.status = Status[status];
    this.sequenceList = sequenceList;
  }
}

export enum Status{
  ACCEPT,
  READ,
  ACCESS,
  NACK,
  ACTION
}
