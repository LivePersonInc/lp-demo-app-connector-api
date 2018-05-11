import { TestBed, async, inject } from '@angular/core/testing';
import { AuthGuardGuard } from './auth-guard.guard';
import {Router} from "@angular/router";
import { LogoutGuard } from './logout.guard';
import {AuthenticationService} from "../services/authentication.service";
import {InstallationService} from "../services/istallation.service";
import {ConversationService} from "../services/conversation.service";
import {AccountConfigService} from "../services/account-config.service";

describe('LogoutGuard', () => {
  beforeEach(() => {
    const authenticationService = jasmine.createSpy('AuthenticationService');
    const installationService = jasmine.createSpy('InstallationService');
    const conversationService = jasmine.createSpy('ConversationService');
    const accountConfigService = jasmine.createSpy('AccountConfigService');

    TestBed.configureTestingModule({
      providers: [
        LogoutGuard,
        {
          provide: Router,
          useClass: class { navigate = jasmine.createSpy("navigate"); }
        },
        {provide: AuthenticationService, useValue: authenticationService},
        {provide: InstallationService, useValue: installationService},
        {provide: ConversationService, useValue: conversationService},
        {provide: AccountConfigService, useValue: accountConfigService},

      ],

    });
  });

  it('should ...', inject([LogoutGuard], (guard: LogoutGuard) => {
    expect(guard).toBeTruthy();
  }));
});
