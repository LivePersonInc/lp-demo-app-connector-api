import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import {AppState} from "../../shared/models/stored-state/AppState";

@Injectable()
export class StateManager {

  public storeLastStateInLocalStorage(state: AppState, brandId: string) {
    let serializedState = JSON.stringify(state);
    localStorage.setItem(brandId, serializedState);
  }

  public getLastStoredStateByBrand(brandId: string): AppState {
    let serializedState = localStorage.getItem(brandId);
    let state = new AppState();
    if(serializedState) {
      state.deserialize(JSON.parse(serializedState));
    }
    return state;
  }

}
