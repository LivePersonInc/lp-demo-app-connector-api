import {inject, TestBed} from '@angular/core/testing';
import {ConversationService} from './conversation.service';
import {MatSnackBar} from "@angular/material";
import {HttpClient} from "@angular/common/http";
import {LoadingService} from "./loading.service";
import {Router} from "@angular/router";
import {ConversationManager} from "../helpers/conversation-manager";
import {StateManager} from "../helpers/state-manager";
import {AuthenticationService} from "./authentication.service";
import {HistoryService} from "./history.service";

describe('ConversationService', () => {
  beforeEach(() => {
    const snackBar = jasmine.createSpy('MatSnackBar');
    const http = jasmine.createSpy('HttpClient');
    const loadingService = jasmine.createSpy('LoadingService');
    const conversationManager = jasmine.createSpy('ConversationManager');
    const stateManager = jasmine.createSpy('StateManager');
    const authenticationService = jasmine.createSpy('AuthenticationService');
    const historyService = jasmine.createSpy('HistoryService');


    TestBed.configureTestingModule({
      providers: [
        ConversationService,
        {provide: ConversationManager, useValue: conversationManager},
        {provide: MatSnackBar, useValue: snackBar},
        {provide: HttpClient, useValue: http},
        {provide: LoadingService, useValue: loadingService},
        {provide: StateManager, useValue: stateManager},
        {provide: AuthenticationService, useValue: authenticationService},
        {provide: HistoryService, useValue: historyService},

        {
          provide: Router,
          useClass: class { navigate = jasmine.createSpy("navigate"); }
        }
      ]
    });

  });

  it('should be created', inject([ConversationService], (service: ConversationService) => {
    expect(service).toBeTruthy();
  }));

});
