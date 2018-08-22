import { TestBed, inject } from '@angular/core/testing';
import { AccountConfigService } from './account-config.service';
import {AuthenticationService} from "./authentication.service";
import {LoadingService} from "./loading.service";
import {MatSnackBar} from "@angular/material";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {StateManager} from "../helpers/state-manager";

describe('AccountConfigService', () => {

  beforeEach(() => {
    const authenticationService = { //MOCK
      userLoggedSubject:{
        subscribe: () => {}
      }
    };
    const snackBar = jasmine.createSpy('MatSnackBar');
    const http = jasmine.createSpy('HttpClient');
    const loadingService = jasmine.createSpy('LoadingService');
    const stateManager = jasmine.createSpy('StateManager');

    TestBed.configureTestingModule({
      providers: [
        AccountConfigService,
        {provide: AuthenticationService, useValue: authenticationService},
        {
          provide: Router,
          useClass: class { navigate = jasmine.createSpy("navigate"); }
        },
        {provide: MatSnackBar, useValue: snackBar},
        {provide: HttpClient, useValue: http},
        {provide: StateManager, useValue: stateManager},
        {provide: LoadingService, useValue: loadingService}]

    });
  });

  it('should be created', inject([AccountConfigService], (service: AccountConfigService) => {
    expect(service).toBeTruthy();
  }));
});
