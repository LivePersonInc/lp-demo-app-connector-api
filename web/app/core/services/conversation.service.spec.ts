import {inject, TestBed} from '@angular/core/testing';
import {ConversationService} from './conversation.service';
import { MatSnackBar } from "@angular/material/snack-bar";
import {HttpClient} from "@angular/common/http";
import {LoadingService} from "./loading.service";
import {Router} from "@angular/router";
import {ConversationManager} from "../util/conversation-manager";
import {StateStorage} from "../util/state-storage";
import {AuthenticationService} from "./authentication.service";
import {HistoryService} from "./history.service";
import {InstallationService} from "./installation.service";
import {DomainsService} from "./domains.service";

describe('ConversationService', () => {
  beforeEach(() => {
    const snackBar = jasmine.createSpy('MatSnackBar');
    const http = jasmine.createSpy('HttpClient');
    const loadingService = jasmine.createSpy('LoadingService');
    const conversationManager = jasmine.createSpy('ConversationManager');
    const stateManager = jasmine.createSpy('StateStorage');
    const authenticationService = jasmine.createSpy('AuthenticationService');
    const historyService = jasmine.createSpy('HistoryService');
    const installationService = jasmine.createSpy('InstallationService');
    const domainsSerive = jasmine.createSpy('DomainsService');


    TestBed.configureTestingModule({
      providers: [
        ConversationService,
        {provide: ConversationManager, useValue: conversationManager},
        {provide: MatSnackBar, useValue: snackBar},
        {provide: HttpClient, useValue: http},
        {provide: LoadingService, useValue: loadingService},
        {provide: StateStorage, useValue: stateManager},
        {provide: AuthenticationService, useValue: authenticationService},
        {provide: HistoryService, useValue: historyService},
        {provide: InstallationService, useValue: installationService},
        {provide: DomainsService, useValue: domainsSerive},

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
