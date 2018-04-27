import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {MatSnackBar} from "@angular/material";
import {HttpClient} from "@angular/common/http";
import {LoadingService} from "./loading.service";
import {environment} from '../../../environments/environment';
import {Subject} from "rxjs/Subject";

@Injectable()
export class DomainsService extends HttpService{
  public domainsSubject = new Subject();
  public domains = [];
  constructor(protected snackBar: MatSnackBar,protected http: HttpClient, protected loadingService:LoadingService) {
    super(snackBar,http, loadingService);
  }

  public getDomainList(brandId: string) {
    this.doGet(`http://${environment.server}/domains/csds/${brandId}`, {}).subscribe((data) => {
      console.log(data);
      //this.domains = data;
      let length = data[0].baseURIs.length;
      for(let i=0; i < length; i++) {
        this.domains[data[0].baseURIs[i].service] = data[0].baseURIs[i].baseURI;
      }
      this.domainsSubject.next('READY');
      this.loadingService.stopLoading();
    }, error => {
      console.log(error);
      this.errorResponse(error);
    });
  }

  public getDomainByServiceName(serviceName: string) {
    return this.domains[serviceName];
  }


}
