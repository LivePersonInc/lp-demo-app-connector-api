import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {MatSnackBar} from "@angular/material";
import {HttpClient} from "@angular/common/http";
import {LoadingService} from "./loading.service";
import {environment} from '../../../environments/environment';

@Injectable()
export class DomainsService extends HttpService{

  constructor(protected snackBar: MatSnackBar,protected http: HttpClient, protected loadingService:LoadingService) {
    super(snackBar,http, loadingService);
  }

  public getDomainList(brandId: string) {
    this.doGet(`http://${environment.server}/domains/csds/${brandId}`, {}).subscribe((data) => {
      console.log(data);
      this.loadingService.stopLoading();
    }, error => {
      console.log(error);
      //this.errorResponse(error);
    });
  }
}
