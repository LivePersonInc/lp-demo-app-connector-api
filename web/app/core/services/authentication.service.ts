import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import {SendApiService} from "./send-api.service";
import {ErrorObservable} from "rxjs/observable/ErrorObservable";
import {Subject} from "rxjs/Subject";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material";
import {LoadingService} from "./loading.service";
import {HttpService} from "./http.service";
import {User} from "../../shared/models/user.model";
import {ConversationService} from "./conversation.service";
import {InstallationService} from "./istallation.service";

@Injectable()
export class AuthenticationService extends HttpService {
  private _user: User;
  public snackBarConfing : MatSnackBarConfig;
  public userLoggedSubject = new Subject<string>();

  constructor(protected http: HttpClient,
              protected sendApiService: SendApiService,
              protected snackBar: MatSnackBar,
              protected loadingService:LoadingService)
  {
    super( snackBar,  http,loadingService);
    //this.user = new User();
  }

  //Barer Token
  public login(brandId: string, username: string, password: string): any {
    this.loadingService.startLoading();
     return this.doPost(`https://ctvr-ano041.dev.lprnd.net/api/account/${brandId}/login`, { username: username, password: password }, {})
       .subscribe(res => {
         this._user = new User();
         this._user.token = res.bearer;
         this._user.userName = username;
         this._user.brandId = brandId;
         this.userLoggedSubject.next('LOGGED-IN');
         //sessionStorage.setItem("lp-logged-in-user", JSON.stringify(this.user));
         this.successResponse('Authentication was successful ');
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


