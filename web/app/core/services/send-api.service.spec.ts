import { TestBed, inject } from '@angular/core/testing';
import {SendApiService} from './send-api.service';
import {MatSnackBar} from "@angular/material";
import {HttpClient} from "@angular/common/http";
import {LoadingService} from "./loading.service";
import {DomainsService} from "./domains.service";
import {Router} from "@angular/router";

describe('SendApiService', () => {
  beforeEach(() => {
    const snackBar = jasmine.createSpy('MatSnackBar');
    const http = jasmine.createSpy('HttpClient');
    const loadingService = jasmine.createSpy('LoadingService');
    const domainsService = jasmine.createSpy('DomainService');
    TestBed.configureTestingModule({
      providers: [
        SendApiService,
        {provide: DomainsService, useValue: domainsService},
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

  it('should be created', inject([SendApiService], (service: SendApiService) => {
    expect(service).toBeTruthy();
  }));
});

