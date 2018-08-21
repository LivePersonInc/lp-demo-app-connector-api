import {Conversation} from "../conversation/conversation.model";
import {AppInstall} from "../app-installation/appInstall.model";
import {Deserializable} from "../deserializable.model";

export class AppState implements Deserializable<AppState>{
  lastConversation: Conversation;
  asyncMessagingEnabled: boolean;
  selectedApp: AppInstall;

  deserialize(input: any): AppState {
    Object.assign(this, input);
    input.lastConversation ? this.lastConversation = new Conversation(null, null, null, null).deserialize(input.lastConversation): this.lastConversation = null;
    input.selectedApp ? this.selectedApp = new AppInstall( ).deserialize(input.selectedApp): this.selectedApp = null;
    return this;
  }
}
