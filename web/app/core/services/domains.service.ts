import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {MatSnackBar} from "@angular/material";
import {HttpClient} from "@angular/common/http";
import {LoadingService} from "./loading.service";
import {environment} from '../../../environments/environment';
import {Subject} from "rxjs/Subject";
import {Router} from "@angular/router";

@Injectable()
export class DomainsService extends HttpService{
  public domainsSubject = new Subject();
  public domains = [];
  constructor(protected snackBar: MatSnackBar,protected http: HttpClient, protected loadingService:LoadingService, protected router: Router) {
    super(snackBar,http, loadingService,router);
  }

  public getDomainList(brandId: string) {
    this.doGet(`${environment.protocol}://${environment.server}:${environment.port}/domains/csds/${brandId}`, {}, true).subscribe((data) => {
      let length = data.baseURIs.length;
      for(let i=0; i < length; i++) {
        this.domains[data.baseURIs[i].service] = data.baseURIs[i].baseURI;
      }
      this.domainsSubject.next('READY');
      //this.loadingService.stopLoading();
    }, error => {
      console.log(error);
      this.errorResponse(error);
    });
  }

  public getDomainByServiceName(serviceName: string) {
    return this.domains[serviceName];
  }

}
