import { TestBed, inject } from '@angular/core/testing';
import { DomainsService } from './domains.service';
import {MatSnackBar} from "@angular/material";
import {HttpClient} from "@angular/common/http";
import {LoadingService} from "./loading.service";
import {Router} from "@angular/router";

describe('DomainsService', () => {
  beforeEach(() => {
    const snackBar = jasmine.createSpy('MatSnackBar');
    const http = jasmine.createSpy('HttpClient');
    const loadingService = jasmine.createSpy('LoadingService');
    TestBed.configureTestingModule({
      providers: [
        DomainsService,
        {provide: MatSnackBar, useValue: snackBar},
        {provide: HttpClient, useValue: http},
        {
          provide: Router,
          useClass: class { navigate = jasmine.createSpy("navigate"); }
        },
        {provide: LoadingService, useValue: loadingService}
      ]
    });
  });

  it('should be created', inject([DomainsService], (service: DomainsService) => {
    expect(service).toBeTruthy();
  }));
});
