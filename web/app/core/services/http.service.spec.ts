import { TestBed, inject } from '@angular/core/testing';
import { HttpService } from './http.service';
import { MatSnackBar } from "@angular/material/snack-bar";
import {HttpClient} from "@angular/common/http";
import {LoadingService} from "./loading.service";
import {Router} from "@angular/router";

describe('HttpService', () => {
  beforeEach(() => {
    const snackBar = jasmine.createSpy('MatSnackBar');
    const http = jasmine.createSpy('HttpClient');
    const loadingService = jasmine.createSpy('LoadingService');
    TestBed.configureTestingModule({
      providers: [
        HttpService,
        {provide: MatSnackBar, useValue: snackBar},
        {provide: HttpClient, useValue: http},
        {provide: LoadingService, useValue: loadingService},
        {
          provide: Router,
          useClass: class { navigate = jasmine.createSpy("navigate"); }
        },
      ]
    });
  });

  it('should be created', inject([HttpService], (service: HttpService) => {
    expect(service).toBeTruthy();
  }));
});
