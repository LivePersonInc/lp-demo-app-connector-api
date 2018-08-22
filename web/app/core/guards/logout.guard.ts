import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {AuthenticationService} from "../services/authentication.service";
import {InstallationService} from "../services/istallation.service";
import {ConversationService} from "../services/conversation.service";
import {AccountConfigService} from "../services/account-config.service";

@Injectable()
export class LogoutGuard implements CanActivate {

  constructor(
    private authenticationService: AuthenticationService,
    private installationService: InstallationService,
    private conversationService: ConversationService,
    private accountConfigService: AccountConfigService,
    private router: Router) {}

  canActivate() {
    this.authenticationService.logOut();
    this.resetState();
    this.router.navigateByUrl('settings');
    return true;
  }

  public resetState() {
    this.installationService.reset();
    this.conversationService.reset();
    this.accountConfigService.reset();
  }
}
