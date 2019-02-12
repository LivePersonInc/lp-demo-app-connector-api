import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from  'rxjs';
import {AuthenticationService} from "../services/authentication.service";
import { map } from 'rxjs/operators'
import {StateRecoveryService} from "../services/state-recovery.service";

@Injectable()
export class AuthGuardGuard implements CanActivate {

  constructor(private authenticationService: AuthenticationService,
              private stateRecoveryService: StateRecoveryService,
              private router: Router) {}

  canActivate()  {
    if(this.authenticationService.isLoggedIn) {
      return true;
    }
    return this.authenticationService.isAuthenticated().pipe(map(res => {
      if(res) {
        this.authenticationService.setLoggedIn(true);
        if(!this.stateRecoveryService.isStateLoaded){
          this.stateRecoveryService.loadCurrentSessionState();
        }
        return true
      } else {
        this.router.navigate(['login']);
        return false
      }
    }))
  }
}
