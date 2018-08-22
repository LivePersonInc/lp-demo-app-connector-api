import { Injectable } from '@angular/core';
import {AuthenticationService} from "./authentication.service";
import {HttpService} from "./http.service";
import {MatSnackBar} from "@angular/material";
import {LoadingService} from "./loading.service";
import {HttpClient} from "@angular/common/http";
import {environment} from '../../../environments/environment';
import {Subject} from "rxjs/Subject";
import {Router} from "@angular/router";
import {StateManager} from "../helpers/state-manager";

@Injectable()
export class AccountConfigService extends HttpService {

  public acSubject = new Subject<string>();
  public accountConfigPropList:any;
  public isAsyncMessagingActive:boolean;
  public brandId = "";
  private headers = {};

  private baseURI = `https://${environment.server}/account/properties/`;


  constructor(protected authenticationService: AuthenticationService,
              protected snackBar: MatSnackBar,
              protected http: HttpClient,
              protected loadingService:LoadingService,
              protected stateManager:StateManager,
              protected router: Router) {
    super(snackBar,http, loadingService,router);

  }

  public init() {
      this.brandId = this.authenticationService.user.brandId;
      this.restoreStoredState();
      this.headers = {
        'headers': {
          'Authorization': `Bearer ${this.authenticationService.user.token}`,
        }
      };
  }

  public getAccountConfigPropertiesList() {
    this.doGet(`${this.baseURI}${this.brandId}`, this.headers).subscribe(data => {
      this.accountConfigPropList = data;
      this.isAsyncMessagingActive = this.checkIsAsyncMessagingActive();
      this.updateAsyncEnablePropInStoredState();
      this.loadingService.stopLoading();
      this.acSubject.next('GET_LIST');
    }, error => {
      this.errorResponse(error);
    });
  }

  public updateAccountConfigProperties() {
    this.doPost(`${this.baseURI}${this.brandId}`, JSON.stringify(this.accountConfigPropList),this.headers).subscribe(data => {
      this.loadingService.stopLoading();
      this.acSubject.next('UPDATED');
    },error => {
      this.errorResponse(error);
    });
  }

  public reset(){
    this.accountConfigPropList = null;
    this.isAsyncMessagingActive = false;
    this.brandId = "";
    this.headers = {};
  }

  private checkIsAsyncMessagingActive(): boolean {
    let feature = this.accountConfigPropList.appDataList[0].accountList.accountList[0].itemsCollection.data
      .filter( e => e.compoundFeatureID == "Common.Async_Messaging");
    return feature[0].value.value;
  }

  private updateAsyncEnablePropInStoredState(){
    let state = this.stateManager.getLastStoredStateByBrand(this.authenticationService.user.brandId);
    state.isAsyncMessagingActive = this.isAsyncMessagingActive;
    this.stateManager.storeLastStateInLocalStorage(state,this.authenticationService.user.brandId);
  }

  private restoreStoredState() {
    let state = this.stateManager.getLastStoredStateByBrand(this.authenticationService.user.brandId);
    if(state.isAsyncMessagingActive != null){
      this.isAsyncMessagingActive = state.isAsyncMessagingActive;
    }
  }

}
