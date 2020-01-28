import {inject, TestBed} from '@angular/core/testing';
import {AuthGuardGuard} from './auth-guard.guard';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import {StateRecoveryService} from '../services/state-recovery.service';

describe('AuthGuardGuard', () => {
  beforeEach(() => {
    const authenticationService = jasmine.createSpy('AuthenticationService');
    const stateRecoveryService = jasmine.createSpy('StateRecoveryService');
    
    TestBed.configureTestingModule({
      providers: [
        AuthGuardGuard,
        {
          provide: Router,
          useClass: class {
            navigate = jasmine.createSpy('navigate');
          }
        },
        {provide: AuthenticationService, useValue: authenticationService},
        {provide: StateRecoveryService, useValue: stateRecoveryService}
      
      ]
    });
  });
  
  it('should be true', inject([AuthGuardGuard], (guard: AuthGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
