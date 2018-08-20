import { TestBed, async, inject } from '@angular/core/testing';

import { StateManager } from './state-manager';
import {SendApiService} from "../services/send-api.service";

describe('StateManager', () => {
  beforeEach(() => {
    const sendApiService = jasmine.createSpy('SendApiService');
    TestBed.configureTestingModule({
      providers: [StateManager, {provide: SendApiService, useValue: sendApiService}]
    });
  });

  it('should inject the service', inject([StateManager], (intercptor: StateManager) => {
    expect(intercptor).toBeTruthy();
  }));


});
