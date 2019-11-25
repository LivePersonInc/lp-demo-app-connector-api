import {inject, TestBed} from '@angular/core/testing';
import {AuthenticationService} from './authentication.service';
import {MatSnackBar} from "@angular/material";
import {HttpClient} from "@angular/common/http";
import {LoadingService} from "./loading.service";
import {Router} from "@angular/router";

describe('AuthenticationService', () => {
  beforeEach(() => {
    const snackBar = jasmine.createSpy('MatSnackBar');
    const http = jasmine.createSpy('HttpClient');
    const loadingService = jasmine.createSpy('LoadingService');
    const domainsService = jasmine.createSpy('DomainService');

    TestBed.configureTestingModule({
      providers: [
        AuthenticationService,
        {
          provide: Router,
          useClass: class { navigate = jasmine.createSpy("navigate"); }
        },
        {provide: MatSnackBar, useValue: snackBar},
        {provide: HttpClient, useValue: http},
        {provide: LoadingService, useValue: loadingService}]
    });
  });

  it('should be created', inject([AuthenticationService], (service: AuthenticationService) => {
    expect(service).toBeTruthy();
  }));
});
