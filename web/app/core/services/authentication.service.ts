import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map'
import {Subject} from "rxjs/Subject";
import {MatSnackBar} from "@angular/material";
import {LoadingService} from "./loading.service";
import {HttpService} from "./http.service";
import {User} from "../../shared/models/user.model";
import {DomainsService} from "./domains.service";
import {InstallationService} from "./istallation.service";
import {ConversationEvent} from "../../shared/models/conversation/conversationEvent.model";
import {AccountConfigService} from "./account-config.service";
import {ConversationService} from "./conversation.service";
import {Router} from "@angular/router";

@Injectable()
export class AuthenticationService extends HttpService {
  private _user: User;
  public userLoggedSubject = new Subject<string>();

  constructor(protected http: HttpClient,
              protected snackBar: MatSnackBar,
              protected domainsService: DomainsService,
              protected loadingService:LoadingService,
              protected router: Router,
  )
  {
    super( snackBar, http,loadingService, router);
  }

  //Bearer Token
  public login(brandId: string, username: string, password: string): any {
    this.loadingService.startLoading();
     return this.
        doPost(`https://${this.domainsService.getDomainByServiceName('agentVep')}/api/account/${brandId}/login`,
       { username: username, password: password }, {})
       .subscribe(res => {
         this._user = new User();
         this._user.token = res.bearer;
         this._user.userName = username;
         this._user.brandId = brandId;
         this.successResponse('Authentication was successful ');
         setTimeout(()=>{
           this.userLoggedSubject.next('LOGGED-IN');
         }, 1500);

      }, error => {
         this.errorResponse("Problem with Authentication");
       });
  }

  get user(): User {
    return this._user ;
  }

  public logOut() {
    //sessionStorage.removeItem("lp-logged-in-user");
    this._user = null;
    this.userLoggedSubject.next('LOGGED-OUT');
  }

}


