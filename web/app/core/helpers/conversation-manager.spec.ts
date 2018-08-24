import { TestBed, async, inject } from '@angular/core/testing';
import {StateManager} from "./state-manager";

import { ConversationManager } from './conversation-manager';
import {SendApiService} from "../services/send-api.service";

describe('ConversationManager', () => {
  beforeEach(() => {
    const sendApiService = jasmine.createSpy('SendApiService');
    const stateManager = jasmine.createSpy('StateManager');

    TestBed.configureTestingModule({
      providers: [ConversationManager,
        {provide: SendApiService, useValue: sendApiService},
        {provide: StateManager, useValue: stateManager}]
    });
  });

  it('should inject the service', inject([ConversationManager], (intercptor: ConversationManager) => {
    expect(intercptor).toBeTruthy();
  }));


});
