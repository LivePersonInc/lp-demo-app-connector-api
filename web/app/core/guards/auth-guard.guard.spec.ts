import { TestBed, async, inject } from '@angular/core/testing';
import { AuthGuardGuard } from './auth-guard.guard';
import {Router} from "@angular/router";
import {AuthenticationService} from "../services/authentication.service";

describe('AuthGuardGuard', () => {
  beforeEach(() => {
    const authenticationService = jasmine.createSpy('AuthenticationService');

    TestBed.configureTestingModule({
      providers: [
        AuthGuardGuard,
        {
          provide: Router,
          useClass: class { navigate = jasmine.createSpy("navigate"); }
        },
        {provide: AuthenticationService, useValue: authenticationService}

      ]
    });
  });

  it('should ...', inject([AuthGuardGuard], (guard: AuthGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
