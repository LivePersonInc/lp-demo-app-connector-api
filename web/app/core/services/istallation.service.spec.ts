import { TestBed, inject } from '@angular/core/testing';
import { InstallationService } from './istallation.service';
import {AuthenticationService} from "./authentication.service";
import {MatSnackBar} from "@angular/material";
import {HttpClient} from "@angular/common/http";
import {LoadingService} from "./loading.service";
import {Router} from "@angular/router";

describe('InstallationService', () => {
  beforeEach(() => {
    const authenticationService = { //MOCK
      userLoggedSubject:{
        subscribe: () => {}
      }
    };
    const snackBar = jasmine.createSpy('MatSnackBar');
    const http = jasmine.createSpy('HttpClient');
    const loadingService = jasmine.createSpy('LoadingService');
    TestBed.configureTestingModule({
      providers: [
        InstallationService,
        {provide: AuthenticationService, useValue: authenticationService},
        {provide: MatSnackBar, useValue: snackBar},
        {provide: HttpClient, useValue: http},
        {provide: LoadingService, useValue: loadingService},
        {
          provide: Router,
          useClass: class { navigate = jasmine.createSpy("navigate"); }
        }
      ]
    });
  });

  it('should be created', inject([InstallationService], (service: InstallationService) => {
    expect(service).toBeTruthy();
  }));
});
