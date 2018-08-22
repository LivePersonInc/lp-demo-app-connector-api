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

  it('should save the app sstate in localstorage', inject([StateManager], (intercptor: StateManager) => {
      let conversation = new Conversation(brandId, "appKey", "appSecret", "usreName" );
      conversation.messages = [];
      let firstMessage = new ChatMessage(MessageType.sent,"125123523632","Hi","usreName","status", true);
      let seconMessage = new ChatMessage(MessageType.sent,"125123523632", "How are u?","usreName", "status", true);
      conversation.messages.push(firstMessage);
      conversation.messages.push(seconMessage);

      let installedApp = new AppInstall();
      installedApp.enabled = true;
      installedApp.client_name = "test App";

      let appState = new AppState();
      appState.lastConversation = conversation;
      appState.asyncMessagingEnabled = true;
      appState.selectedApp = installedApp;

      intercptor.storeLastStateInLocalStorage(appState, brandId);

      expect(localStorage.getItem(brandId)).toBeTruthy();

  }));

  it('should get the state from the localStorage ', inject([StateManager], (intercptor: StateManager) => {

    expect(intercptor.getLastStoredStateByBrand(brandId)).toBeTruthy();


  }));

  it('should get the conversation deserialized from the localStorage ', inject([StateManager], (intercptor: StateManager) => {

    expect(intercptor.getLastStoredStateByBrand(brandId).lastConversation.messages.length).toBe(2);

  }));


});
