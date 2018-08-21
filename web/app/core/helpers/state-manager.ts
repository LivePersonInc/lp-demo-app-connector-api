import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import {Conversation} from "../../shared/models/conversation/conversation.model";

@Injectable()
export class StateManager {

  public storeLastConversationInLocalStorage(conversation: Conversation) {
    /*let serializedConversation  = JSON.stringify(conversation);
    console.log(serializedConversation);
    localStorage.setItem(conversation.branId, serializedConversation);*/

    //TODO:
  }

  public getLastStoredConversation(brandId: string): Conversation {
   /* let serializedConversation = localStorage.getItem(brandId);
    console.log(serializedConversation);*/
    // TODO:

    return null;
  }


}
