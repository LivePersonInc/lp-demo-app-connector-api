
export class EventAcceptStatus {
  public type;
  public status: Status;
  public sequenceList: Array<number>
  constructor(status: Status, sequenceList: Array<number>) {
    this.type = "AcceptStatusEvent";
    this.status = status;
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
