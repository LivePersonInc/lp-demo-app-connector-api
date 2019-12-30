import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';


@Injectable()
export class LogoutGuard implements CanActivate {
  
  constructor(private authenticationService: AuthenticationService, private router: Router) {
    this.authenticationService.userLoggedSubject.subscribe(event => {
      if (event === 'LOGGED-OUT') {
        this.router.navigate(['login']);
      }
    });
  }
  
  canActivate() {
    this.authenticationService.logout('Logged out');
    return true;
  }
  
}
