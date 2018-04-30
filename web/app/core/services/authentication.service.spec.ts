import { TestBed, inject } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';
import {MatSnackBar} from "@angular/material";
import {HttpClient} from "@angular/common/http";
import {LoadingService} from "./loading.service";
import {DomainsService} from "./domains.service";

describe('AuthenticationService', () => {
  beforeEach(() => {
    const snackBar = jasmine.createSpy('MatSnackBar');
    const http = jasmine.createSpy('HttpClient');
    const loadingService = jasmine.createSpy('LoadingService');
    const domainsService = jasmine.createSpy('DomainService');
    TestBed.configureTestingModule({
      providers: [
        AuthenticationService,
        {provide: DomainsService, useValue: domainsService},
        {provide: MatSnackBar, useValue: snackBar},
        {provide: HttpClient, useValue: http},
        {provide: LoadingService, useValue: loadingService}]
    });
  });

  it('should be created', inject([AuthenticationService], (service: AuthenticationService) => {
    expect(service).toBeTruthy();
  }));
});
