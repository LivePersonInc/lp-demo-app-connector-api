import {Injectable} from '@angular/core';
import {State} from '../../shared/models/stored-state/AppState';

@Injectable()
export class StateStorage {
  
  public storeLastStateInLocalStorage(state: State, brandId: string) {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(brandId, serializedState);
  }
  
  public getLastStoredStateByBrand(brandId: string): State {
    const serializedState = localStorage.getItem(brandId);
    const state = new State();
    if (serializedState) {
      state.deserialize(JSON.parse(serializedState));
    }
    return state;
  }
  
}
