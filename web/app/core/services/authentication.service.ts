import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map'
import {Subject} from "rxjs/Subject";
import {MatSnackBar} from "@angular/material";
import {LoadingService} from "./loading.service";
import {HttpService} from "./http.service";
import {User} from "../../shared/models/user.model";
import {DomainsService} from "./domains.service";
import {Router} from "@angular/router";
import {environment} from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthenticationService extends HttpService {
  private _user: User;
  private loggedInStatus = false;

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

  setLoggedIn(value: boolean) {
    this.loggedInStatus = value
  }
  //Bearer Token
  public login(brandId: string, username: string, password: string): any {
    this.loadingService.startLoading();
     return this.
        doPost(`${environment.protocol}://${environment.server}:${environment.port}/login`,
       {username:  brandId + "-" + username, password: password }, {})
       .subscribe(res => {
         this._user = new User();
         this._user.token = res.bearer;
         this._user.userName = username;
         this._user.brandId = brandId;
         this.successResponse('Authentication was successful ');
         this.setLoggedIn(true);
         setTimeout(()=>{
           this.userLoggedSubject.next('LOGGED-IN');
         }, 1500);

      }, error => {
         this.errorResponse("Problem with Authentication");
       });
  }
  public logout() {
    this.loggedInStatus = false;
    return this.doGet(`${environment.protocol}://${environment.server}:${environment.port}/logout`, {},true).subscribe(res => {
      this._user = null;
     // this.setLoggedIn(false);
      this.userLoggedSubject.next('LOGGED-OUT');
      this.loadingService.stopLoading();
    }, error => {
      this.errorResponse("Problem with Authentication");
      this.loadingService.stopLoading();
    });
  }

  public isAuthenticated(): Observable<boolean> {
    return this.doGet(`${environment.protocol}://${environment.server}:${environment.port}/isAuthenticated`, {}, false);
  }

  get user(): User {
    return this._user ;
  }

  set user(user: User) {
    this._user = user;
  }


  get isLoggedIn() {
    return this.loggedInStatus;
  }

}


