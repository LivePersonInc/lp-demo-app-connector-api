import { TestBed, async, inject } from '@angular/core/testing';

import { StateStorage } from './state-storage';
import {Conversation} from "../../shared/models/conversation/conversation.model";
import {ChatMessage, MessageType} from "../../shared/models/conversation/chatMessage.model";
import {AppInstall} from "../../shared/models/app-installation/appInstall.model";
import {AppState} from "../../shared/models/stored-state/AppState";

describe('StateStorage', () => {

  const brandId = "Le1234576586";

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StateStorage]
    });
  });

  it('should inject the service', inject([StateStorage], (intercptor: StateStorage) => {
    expect(intercptor).toBeTruthy();
  }));


  it('should save the app state in localstorage', inject([StateStorage], (intercptor: StateStorage) => {
      storeAppState(intercptor);
      expect(localStorage.getItem(brandId)).toBeTruthy();

  }));

  it('should get the state from the localStorage ', inject([StateStorage], (intercptor: StateStorage) => {
    storeAppState(intercptor);
    expect(intercptor.getLastStoredStateByBrand(brandId)).toBeTruthy();
  }));


  function storeAppState(intercptor: StateStorage) {
    let appState = new AppState();
    appState.conversationId = "conversation_id";
    appState.appId = "app_id";
    appState.ext_consumer_id = "054085048u06";
    appState.userName = "kim";

    intercptor.storeLastStateInLocalStorage(appState, brandId);
  }


});
