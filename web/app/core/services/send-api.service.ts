import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {ErrorObservable} from "rxjs/observable/ErrorObservable";
import * as Client from 'node-rest-client';
import {HttpService} from "./http.service";
import {LoadingService} from "./loading.service";

@Injectable()
export class SendApiService extends HttpService {

  constructor(protected snackBar: MatSnackBar,protected http: HttpClient, protected loadingService:LoadingService) {
    super(snackBar,http, loadingService);
  }

  public getAppJWT(brandId: string, appKey: string, appSecret: string, httpOptions: any): Observable<Object> {
    return this.doPost(`https://${environment.sentinel}/sentinel/api/account/${brandId}/app/token?v=1.0&grant_type=client_credentials&client_id=${appKey}&client_secret=${appSecret}`, null, httpOptions);
  }

  public getConsumerJWS(brandId: string, body: any, httpOptions: any): Observable<Object> {
    return this.doPost(`https://${environment.idp}/api/account/${brandId}/consumer?v=1.0`, body, httpOptions);
  }

  public openConversation(brandId: string, body: any, headers: any): Observable<Object> {
    return this.doPost(`http://${environment.server}/ums/openconv/${brandId}`, body, headers);
  }

  public sendMessage(brandId: string, convId: string, body: any, headers: any): Observable<Object> {
    return this.doPost(`http://${environment.server}/ums/sendraw/${brandId}/conv/${convId}`, body, headers);
  }

  public closeConversation(brandId: string, convId: string, headers: any): Observable<Object> {
    return this.doPost(`http://${environment.server}/ums/close/${brandId}/conv/${convId}`, null, headers);
  }

}
