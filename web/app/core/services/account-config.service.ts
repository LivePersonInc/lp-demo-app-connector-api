import { Injectable } from '@angular/core';
import {AuthenticationService} from "./authentication.service";
import {HttpService} from "./http.service";
import {MatSnackBar} from "@angular/material";
import {LoadingService} from "./loading.service";
import {HttpClient} from "@angular/common/http";
import {environment} from '../../../environments/environment';
import {Subject} from "rxjs/Subject";

@Injectable()
export class AccountConfigService extends HttpService {

  public acSubject = new Subject<string>();
  public accountConfigPropList:any;
  public isAsyncMessagingActive:boolean;
  public brandId = "";
  private headers = {};

  constructor(private authenticationService: AuthenticationService,protected snackBar: MatSnackBar,protected http: HttpClient, protected loadingService:LoadingService) {
    super(snackBar,http, loadingService);
    this.brandId = this.authenticationService.getUser().brandId;
    this.headers = {'headers': {
      'Authorization': `Bearer ${this.authenticationService.getBearerToken()}`,
      }
    };
  }

  public getAccountConfigPropertiesList() {
    this.doGet(`http://${environment.umsDomain}/account/properties/${this.brandId}`, this.headers).subscribe(data => {
      this.accountConfigPropList = data;
      this.isAsyncMessagingActive = this.checkIsAsyncMessagingActive();
      this.loadingService.stopLoading();
      this.acSubject.next('GET_LIST');
    }, error => {
      this.errorResponse(error);
    });
  }

  public updateAccountConfigProperties() {
    this.doPost(`http://${environment.umsDomain}/account/properties/${this.brandId}`, JSON.stringify(this.accountConfigPropList),this.headers).subscribe(data => {
      this.loadingService.stopLoading();
      this.acSubject.next('UPDATED');
    },error => {
      this.errorResponse(error);
    });
  }

  private checkIsAsyncMessagingActive(): boolean {
    let feature = this.accountConfigPropList.appDataList[0].accountList.accountList[0].itemsCollection.data
      .filter( e => e.compoundFeatureID == "Common.Async_Messaging");
    return feature[0].value.value;
  }

}
