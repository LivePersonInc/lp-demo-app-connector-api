import { Injectable } from '@angular/core';
import {AuthenticationService} from "./authentication.service";
import {HttpService} from "./http.service";
import {MatSnackBar} from "@angular/material";
import {LoadingService} from "./loading.service";
import {HttpClient} from "@angular/common/http";
import {environment} from '../../../environments/environment';

@Injectable()
export class AccountConfigService extends HttpService {

  public accountConfigPropList:any;
  public headers = {};
  public brandId = "";

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
      console.log(data);
      this.loadingService.stopLoading();
    });
  }

  public updateAccountConfigProperties() {
    this.doPost(`http://${environment.umsDomain}/account/properties/${this.brandId}`, this.accountConfigPropList,this.headers).subscribe(data => {
      console.log(data);
      this.loadingService.stopLoading();
    });
  }

}
