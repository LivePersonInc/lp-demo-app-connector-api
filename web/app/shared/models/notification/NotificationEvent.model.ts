import {Deserializable} from "../deserializable.model";

export class NotificationEventModel implements Deserializable<NotificationEventModel> {
  kind: string;
  body: NotificationBody;
  type: string;

  deserialize(input: any): NotificationEventModel {
    Object.assign(this, input);
    input.body ? this.body = new NotificationBody().deserialize(input.body): null;
    return this;
  }

}

export class NotificationBody implements Deserializable<NotificationBody> {
  changes:Array<(MessagingEventNotification | ExConversationChangeNotification)>;

  deserialize(input: any): NotificationBody {
    if(input.length && input.length > 0){
      this.changes = [];
      input.forEach( elem => {
          if(elem.type && elem.type === 'UPSERT') {
              this.changes.push(new ExConversationChangeNotification().deserialize(elem));
          } else {
            this.changes.push(new MessagingEventNotification().deserialize(elem));
          }
      })
    }
    return this;
  }

}

export class MessagingEventNotification implements Deserializable<MessagingEventNotification> {
  sequence: number;
  originatorId: string;
  originatorMetadata;
  serverTimestamp: string;
  event;
  conversationId: string;
  dialogId:string;

  deserialize(input: any): MessagingEventNotification {
    Object.assign(this, input);
    //input.capabilities ? this.capabilities = new Capabilities().deserialize(input.capabilities): null;
    return this;
  }

}

export class ExConversationChangeNotification implements Deserializable<ExConversationChangeNotification> {
  type: string;
  result: any;

  deserialize(input: any): ExConversationChangeNotification {
    Object.assign(this, input);
    //input.capabilities ? this.capabilities = new Capabilities().deserialize(input.capabilities): null;
    return this;
  }

}
