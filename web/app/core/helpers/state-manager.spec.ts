import { TestBed, async, inject } from '@angular/core/testing';

import { StateManager } from './state-manager';
import {Conversation} from "../../shared/models/conversation/conversation.model";
import {ChatMessage, MessageType} from "../../shared/models/conversation/chatMessage.model";
import {AppInstall} from "../../shared/models/app-installation/appInstall.model";
import {AppState} from "../../shared/models/stored-state/AppState";

describe('StateManager', () => {

  const brandId = "Le1234576586";

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StateManager]
    });
  });

  it('should inject the service', inject([StateManager], (intercptor: StateManager) => {
    expect(intercptor).toBeTruthy();
  }));


  it('should save the app state in localstorage', inject([StateManager], (intercptor: StateManager) => {

      this.storeAppState(intercptor);
      expect(localStorage.getItem(brandId)).toBeTruthy();

  }));

  it('should get the state from the localStorage ', inject([StateManager], (intercptor: StateManager) => {
    this.storeAppState(intercptor);
    expect(intercptor.getLastStoredStateByBrand(brandId)).toBeTruthy();
  }));


  function storeAppState(intercptor: StateManager) {
    let appState = new AppState();
    appState.conversationId = "conversation_id";
    appState.appId = "app_id";

    intercptor.storeLastStateInLocalStorage(appState, brandId);
  }


});
