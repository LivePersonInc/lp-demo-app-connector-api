import { TestBed, inject } from '@angular/core/testing';
import {DomainsService} from "../services/domains.service";
import {RequestConsoleInterceptor} from "./request-console.interceptor";
import {ConversationService} from "../services/conversation.service";

describe('RequestConsoleInterceptor', () => {
  beforeEach(() => {
    const conversationService = jasmine.createSpy('ConversationService');
    TestBed.configureTestingModule({
      providers: [RequestConsoleInterceptor, {provide: ConversationService, useValue: conversationService}]
    });
  });

  it('should inject the service', inject([RequestConsoleInterceptor], (intercptor: RequestConsoleInterceptor) => {
    expect(intercptor).toBeTruthy();
  }));

});
