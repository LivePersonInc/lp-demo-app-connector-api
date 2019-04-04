import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Subject} from "rxjs";
import {MatSnackBar} from "@angular/material";
import {LoadingService} from "./loading.service";
import {HttpService} from "./http.service";
import {User} from "../../shared/models/user.model";
import {DomainsService} from "./domains.service";
import {Router} from "@angular/router";
import {environment} from '../../../environments/environment';
import {throwError, Observable} from "rxjs";
import {map, catchError} from "rxjs/operators";

@Injectable()
export class AuthenticationService extends HttpService {
  private _user: User;
  private loggedInStatus = false;
  public userLoggedSubject = new Subject<string>();

  get user(): User {
    return this._user ;
  }

  set user(user: User) {
    this._user = user;
  }

  get isLoggedIn() {
    return this.loggedInStatus;
  }

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

  public login(brandId: string, username: string, password: string): any {
      const domain = this.domainsService.getDomainByServiceName('agentVep');
      const httpOptions = {
          headers: new HttpHeaders({'LP-DOMAIN': domain})
      };
     return this.doPost(`${environment.protocol}://${environment.server}:${environment.port}/login`,
       {username:  brandId + "-" + username, password: password }, httpOptions).pipe(
         map(res => {
           this._user = new User();
           this._user.userName = username;
           this._user.brandId = brandId;
           this.successResponse('Authentication was successful ');
           this.setLoggedIn(true);
           setTimeout(()=>{
             this.userLoggedSubject.next('LOGGED-IN');
           }, 1500);
      }),
       catchError(error => {
         this.errorResponse("Wrong credentials!!");
         return throwError(new Error(error || 'An error occurred, please try again later'));
       })
     ).subscribe();
  }
  public logout(message: string) {
    this.loggedInStatus = false;
    return this.doGet(`${environment.protocol}://${environment.server}:${environment.port}/logout`, {},true).pipe(
      map((res) => {
        this._user = null;
        this.loggedInStatus = false;
        this.userLoggedSubject.next('LOGGED-OUT');
        this.customResponse(message);
      }),
      catchError(error => {
        this.errorResponse("Logout error");
        return throwError(new Error(error || 'An error occurred, please try again later'));
      })
    ).subscribe();
  }

  public isAuthenticated(): Observable<boolean> {
    return this.doGet(`${environment.protocol}://${environment.server}:${environment.port}/isAuthenticated`, {}, false);
  }

}


