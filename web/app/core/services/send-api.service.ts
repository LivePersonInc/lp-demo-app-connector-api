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
export class SendApiService  extends HttpService {
  public appJWT: string;
  private client = new (<any> Client).Client();

  constructor(private snackBar: MatSnackBar,private http: HttpClient, private loadingService:LoadingService) {
    super(snackBar,http, loadingService);
  }



  public getAppJWT(brandId: string, appKey: string, appSecret: string, httpOptions: any): Observable<Object> {
    this.loadingService.startLoading();
    return this.http.post(`https://${environment.sentinel}/sentinel/api/account/${brandId}/app/token?v=1.0&grant_type=client_credentials&client_id=${appKey}&client_secret=${appSecret}`, null, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  public getConsumerJWS(brandId: string, body: any, httpOptions: any): Observable<Object> {
    this.loadingService.startLoading();
    return this.http.post(`https://${environment.idp}/api/account/${brandId}/consumer?v=1.0`, body, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  public openConversation(brandId: string, body: any, headers: any): Observable<Object> {
    this.loadingService.startLoading();
    return this.http.post(`http://${environment.umsDomain}/umsbrige/openconv/${brandId}`, body, headers)
      .pipe(catchError(this.handleError));
  }

  public sendMessage(brandId: string, convId: string, body: any, headers: any): Observable<Object> {
    this.loadingService.startLoading();
    return this.http.post(`http://${environment.umsDomain}/umsbrige/sendraw/${brandId}/conv/${convId}`, body, headers)
      .pipe(catchError(this.handleError));
  }

  public closeConversation(brandId: string, convId: string, headers: any): Observable<Object> {
    this.loadingService.startLoading();
    return this.http.post(`http://${environment.umsDomain}/umsbrige/close/${brandId}/conv/${convId}`, null, headers)
      .pipe(
        catchError(this.handleError)
      );
  }

}
