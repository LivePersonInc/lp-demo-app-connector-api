import { TestBed, async, inject } from '@angular/core/testing';

import { ConversationManager } from './conversation-manager';
import {SendApiService} from "../services/send-api.service";

describe('ConversationManager', () => {
  beforeEach(() => {
    const sendApiService = jasmine.createSpy('SendApiService');
    TestBed.configureTestingModule({
      providers: [ConversationManager, {provide: SendApiService, useValue: sendApiService}]
    });
  });

  it('should inject the service', inject([ConversationManager], (intercptor: ConversationManager) => {
    expect(intercptor).toBeTruthy();
  }));


});
