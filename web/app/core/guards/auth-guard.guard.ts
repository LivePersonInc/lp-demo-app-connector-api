import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {AuthenticationService} from "../services/authentication.service";
import { map } from 'rxjs/operators'

@Injectable()
export class AuthGuardGuard implements CanActivate {

  constructor(private authenticationService: AuthenticationService, private router: Router) {}

  canActivate()  {
    console.log("Can activate");
    if(this.authenticationService.isLoggedIn) {

      return true;
    }
    return this.authenticationService.isAuthenticated().pipe(map(res => {
      if(res) {
        this.authenticationService.setLoggedIn(true)
        return true
      } else {
       // this.router.navigateByUrl('/#/login');

        this.router.navigate(['login'])
        return false
      }
    }))
  }
}
