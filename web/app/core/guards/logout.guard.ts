import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';


@Injectable()
export class LogoutGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate() {
    this.router.navigateByUrl('settings');
    location.reload();
    return true;
  }


}
