import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {MatSnackBar} from "@angular/material";
import {HttpClient} from "@angular/common/http";
import {LoadingService} from "./loading.service";
import {environment} from '../../../environments/environment';
import {Router} from "@angular/router";
import {AuthenticationService} from "./authentication.service";
import {User} from "../../shared/models/user.model";
import {InstallationService} from "./istallation.service";
import {ConversationService} from "./conversation.service";
import {AccountConfigService} from "./account-config.service";
import {DomainsService} from "./domains.service";

@Injectable()
export class StateRecoveryService extends HttpService{
  public domains = [];
  public isStateLoaded: boolean;

  constructor(protected snackBar: MatSnackBar,
              protected http: HttpClient,
              protected loadingService:LoadingService,
              protected router: Router,
              protected domainsService: DomainsService,
              protected installationService: InstallationService,
              protected conversationService: ConversationService,
              protected accountConfigService: AccountConfigService,
              protected authenticationService: AuthenticationService) {

    super(snackBar,http, loadingService,router);

    domainsService.domainsSubject.subscribe( event => {
      this.initializeState();
    });
  }

  public getSession(): any{
    return this.
    doGet(`${environment.protocol}://${environment.server}:${environment.port}/getSession`, {}, true)
      .subscribe(res => {
        const user = new User();
        user.brandId = res.passport.user.csdsCollectionResponse.baseURIs[0].account; //TODO: check in server
        user.userName =  res.passport.user.config.loginName;
        user.token = res.passport.user.bearer;
        this.authenticationService.user = user;

        this.domainsService.getDomainList(user.brandId);

      }, error => {
        this.errorResponse("Problem with getting session object");
      });
  }

  public loadCurrentSessionState(): any {
    this.getSession();
  }

  public goToStartConfigPage() {
    this.router.navigateByUrl('settings/start');
  }

  public goToStartDemoPage() {
    this.router.navigateByUrl('demo');
  }

  public initializeState() {
    if(this.authenticationService && this.authenticationService.user) {
      this.installationService.init();
      this.conversationService.init();
      this.accountConfigService.init();
      this.accountConfigService.getAccountConfigPropertiesList();
    }
  }

}