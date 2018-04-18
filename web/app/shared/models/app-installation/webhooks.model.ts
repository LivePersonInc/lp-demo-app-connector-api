import {Endpoint} from "./endpoint.model";
import {Deserializable} from "../deserializable.model";

export class Webhooks implements Deserializable<Webhooks>{
  'ms.MessagingEventNotification.ContentEvent': Endpoint;
  'ms.MessagingEventNotification.RichContentEvent': Endpoint;
  'ms.MessagingEventNotification.AcceptStatusEvent': Endpoint;
  'ms.MessagingEventNotification.ChatStateEvent': Endpoint;
  'ms.MessagingEventNotification.ExConversationChangeNotification': Endpoint;

  deserialize(input: any): Webhooks{
    Object.assign(this, input);
    input['ms.MessagingEventNotification.ContentEvent'] ? this['ms.MessagingEventNotification.ContentEvent'] =  new Endpoint().deserialize(input['ms.MessagingEventNotification.ContentEvent']): '';
    input['ms.MessagingEventNotification.RichContentEvent']? this['ms.MessagingEventNotification.RichContentEvent'] =  new Endpoint().deserialize(input['ms.MessagingEventNotification.RichContentEvent']): '';
    input['ms.MessagingEventNotification.AcceptStatusEvent'] ? this['ms.MessagingEventNotification.AcceptStatusEvent'] =  new Endpoint().deserialize(input['ms.MessagingEventNotification.AcceptStatusEvent']): '';
    input['ms.MessagingEventNotification.ChatStateEvent'] ? this['ms.MessagingEventNotification.ChatStateEvent'] =  new Endpoint().deserialize(input['ms.MessagingEventNotification.ChatStateEvent']): '';
    input['cqm.ExConversationChangeNotification']? this['cqm.ExConversationChangeNotification'] =  new Endpoint().deserialize(input['cqm.ExConversationChangeNotification']): '';
    return this;
  }

}

