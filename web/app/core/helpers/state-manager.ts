import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import {Conversation} from "../../shared/models/conversation/conversation.model";
import {AppState} from "../../shared/models/stored-state/AppState";

@Injectable()
export class StateManager {

  public storeLastStateInLocalStorage(state: AppState) {
    let serializedState = JSON.stringify(state);
    localStorage.setItem(state.lastConversation.branId, serializedState);
  }

  public getLastStoredStateByBrand(brandId: string): AppState {
    let serializedState = localStorage.getItem(brandId);
    console.log(serializedState);
    let state = new AppState();
    state.deserialize(JSON.parse(serializedState));

    return state;
  }


}
