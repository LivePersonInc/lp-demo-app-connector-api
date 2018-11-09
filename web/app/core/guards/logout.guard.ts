import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthenticationService} from "../services/authentication.service";


@Injectable()
export class LogoutGuard implements CanActivate {

  constructor(private authenticationService: AuthenticationService, private router: Router) {}

  canActivate() {
    this.authenticationService.logout();
    this.router.navigate(['login']);
    //location.reload();
    //TODO: check
    return true;
  }


}
