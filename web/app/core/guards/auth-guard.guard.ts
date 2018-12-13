import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {AuthenticationService} from "../services/authentication.service";
import { map } from 'rxjs/operators'
import {StateRecoveryService} from "../services/state-recovery.service";

@Injectable()
export class AuthGuardGuard implements CanActivate {

  constructor(private authenticationService: AuthenticationService,
              private stateRecoveryService: StateRecoveryService,
              private router: Router) {}

  canActivate()  {
    console.log("CAN ACTIVATE");
    if(this.authenticationService.isLoggedIn) {
      return true;
    }
    return this.authenticationService.isAuthenticated().pipe(map(res => {
      console.log(res);
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
