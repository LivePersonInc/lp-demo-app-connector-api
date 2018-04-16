import { Injectable } from '@angular/core';
import {AuthenticationService} from "./authentication.service";
import {HttpService} from "./http.service";
import {MatSnackBar} from "@angular/material";
import {LoadingService} from "./loading.service";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class AccountConfigService extends HttpService{

  public accountConfigPropList:any;
  public headers = {};


  constructor(private authenticationService: AuthenticationService,protected snackBar: MatSnackBar,protected http: HttpClient, protected loadingService:LoadingService) {
    super(snackBar,http, loadingService);

     this.headers = {'headers': {
      'content-type':'application/json',
      'Authorization': `Bearer ${this.authenticationService.getBearerToken()}`,

    }
    };
  }

  public getAccountConfigPropertiesList() {
      return this.doGet(`https://`, this.headers).subscribe(data => {
        console.log(data);
      });

  }

  public updateAccountConfigProperties() {
    return this.doPost(`https://`, this.accountConfigPropList,this.headers).subscribe(data => {
      console.log(data);
    });
  }

}
