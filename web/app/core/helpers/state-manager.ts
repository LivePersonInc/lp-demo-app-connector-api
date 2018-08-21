import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import {Conversation} from "../../shared/models/conversation/conversation.model";

@Injectable()
export class StateManager {

  public storeLastConversationInLocalStorage(conversation: Conversation) {
    let serializedConversation  = JSON.stringify(conversation);
    localStorage.setItem(conversation.branId, serializedConversation);
  }

  public getLastStoredConversationByBrand(brandId: string): Conversation {
    let serializedConversation = localStorage.getItem(brandId);
    let conversation = new Conversation(null,null,null,null);
    conversation.deserialize(serializedConversation);

    return conversation;
  }




}
