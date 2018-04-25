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

@Injectable()
export class AuthenticationService extends HttpService {
  public user: User;
  public snackBarConfing : MatSnackBarConfig;
  public userLoggedSubject = new Subject<string>();

  constructor(protected http: HttpClient,
              protected sendApiService: SendApiService,
              protected snackBar: MatSnackBar,
              protected loadingService:LoadingService,
              protected conversationService: ConversationService) {
    super( snackBar,  http,loadingService);
  }

  //Barer Token
  public login(brandId: string, username: string, password: string): any {
    this.loadingService.startLoading();
     return this.doPost(`https://ctvr-ano041.dev.lprnd.net/api/account/${brandId}/login`, { username: username, password: password }, {})
       .subscribe(res => {
         this.user = new User();
         this.user.token = res.bearer;
         this.user.userName = username;
         this.user.brandId = brandId;
         this.userLoggedSubject.next('LOGGED-IN');
         //sessionStorage.setItem("lp-logged-in-user", JSON.stringify(this.user));
         this.successResponse('Authentication was successful ');
      }, error => {
         this.errorResponse("Problem with Authentication");
       });
  }

  public getUser(): User {
    return this.user ;
  }

  public logOut() {
    //sessionStorage.removeItem("lp-logged-in-user");
    this.user = null;
    this.conversationService.reset();
    this.userLoggedSubject.next('LOGGED-OUT');

  }

}


