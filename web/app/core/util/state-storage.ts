import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import {State} from "../../shared/models/stored-state/AppState";

@Injectable()
export class StateStorage {

  public storeLastStateInLocalStorage(state: State, brandId: string) {
    let serializedState = JSON.stringify(state);
    localStorage.setItem(brandId, serializedState);
  }

  public getLastStoredStateByBrand(brandId: string): State {
    let serializedState = localStorage.getItem(brandId);
    let state = new State();
    if(serializedState) {
      state.deserialize(JSON.parse(serializedState));
    }
    return state;
  }

}
