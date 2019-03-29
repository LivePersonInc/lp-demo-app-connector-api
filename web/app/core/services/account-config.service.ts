import { Injectable } from '@angular/core';
import {AuthenticationService} from "./authentication.service";
import {HttpService} from "./http.service";
import {MatSnackBar} from "@angular/material";
import {LoadingService} from "./loading.service";
import {HttpClient} from "@angular/common/http";
import {environment} from '../../../environments/environment';
import {Subject} from "rxjs";
import {Router} from "@angular/router";
import {throwError, Observable} from "rxjs";
import {map, catchError} from "rxjs/operators";

@Injectable()
export class AccountConfigService extends HttpService {

  public acSubject = new Subject<string>();
  public accountConfigPropList:any;
  public isAsyncMessagingActive:boolean;
  public brandId = "";

  private baseURI = `${environment.protocol}://${environment.server}:${environment.port}/demo/account/properties/`;


  constructor(protected authenticationService: AuthenticationService,
              protected snackBar: MatSnackBar,
              protected http: HttpClient,
              protected loadingService:LoadingService,
              protected router: Router) {
    super(snackBar,http, loadingService,router);

  }

  public init() {
    if(this.authenticationService && this.authenticationService.user) {
      this.brandId = this.authenticationService.user.brandId;
    }
  }

  public getAccountConfigPropertiesList() {
    this.doGet(`${this.baseURI}${this.brandId}`, {},true).pipe(
      map(data => {
        this.accountConfigPropList = data;
        this.isAsyncMessagingActive = this.checkIsAsyncMessagingActive();
        this.loadingService.stopLoading();
        this.acSubject.next('GET_LIST');
      }),
      catchError(error => {
        this.errorResponse(error);
        return throwError(new Error(error || 'An error occurred, please try again later'));
      })
    ).subscribe();
  }

  public updateAccountConfigProperties() {
    this.doPost(`${this.baseURI}${this.brandId}`, JSON.stringify(this.accountConfigPropList), {}).pipe(
      map(data => {
        this.loadingService.stopLoading();
        this.acSubject.next('UPDATED');
      }),
      catchError(error => {
        this.errorResponse(error);
        return throwError(new Error(error || 'An error occurred, please try again later'));
      })
    ).subscribe();
  }

  public reset(){
    this.accountConfigPropList = null;
    this.isAsyncMessagingActive = false;
    this.brandId = "";
  }

  private checkIsAsyncMessagingActive(): boolean {
    let feature = this.accountConfigPropList.appDataList[0].accountList.accountList[0].itemsCollection.data
      .filter( e => e.compoundFeatureID == "Common.Async_Messaging");
    return feature[0].value.value;
  }


}
