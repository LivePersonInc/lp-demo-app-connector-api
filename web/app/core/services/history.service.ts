import { Injectable } from '@angular/core';
import {AuthenticationService} from "./authentication.service";
import {HttpService} from "./http.service";
import {MatSnackBar} from "@angular/material";
import {LoadingService} from "./loading.service";
import {HttpClient} from "@angular/common/http";
import {environment} from '../../../environments/environment';
import {Subject} from "rxjs/Subject";
import {Router} from "@angular/router";

@Injectable()
export class HistoryService extends HttpService {

  public historySubject = new Subject<any>();
  public history;
  public brandId;
  private headers = {};
  private baseURI = `${environment.protocol}://${environment.server}:${environment.port}/demo/history/`;


  constructor(private authenticationService: AuthenticationService,protected snackBar: MatSnackBar,protected http: HttpClient, protected loadingService:LoadingService, protected  router: Router) {
    super(snackBar,http, loadingService, router);
  }

  public init() {
    this.brandId = this.authenticationService.user.brandId;
    this.headers = {'headers':
      {
        'Authorization': `Bearer ${this.authenticationService.user.token}`,
      }
    };
  }

  public getHistoryByConsumerId(consumerId: string) {
    this.doGet(`${this.baseURI}${this.brandId}/consumer/${consumerId}`, this.headers).subscribe((data: Array<any>) => {
      this.history = data;
      this.loadingService.stopLoading();
      this.historySubject.next('GET_CONV_HISTORY');
    }, error => {
      this.errorResponse(error);
    });
  }

}
