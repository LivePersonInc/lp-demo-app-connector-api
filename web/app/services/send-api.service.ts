import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';
import {environment} from '../../environments/environment';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {ErrorObservable} from "rxjs/observable/ErrorObservable";
import * as Client from 'node-rest-client';

@Injectable()
export class SendApiService {
  public appJWT: string;
  private loadingSubject = new Subject<any>();
  private client = new (<any> Client).Client();

  constructor(public snackBar: MatSnackBar, private http: HttpClient) {

  }

  public getIsLoading(): Observable<any> {
    return this.loadingSubject.asObservable();
  }

  public stopLoading() {
    this.loadingSubject.next(false);
  }

  public getAppJWT(brandId: string, appKey: string, appSecret: string, httpOptions: any): Observable<Object> {
    this.loadingSubject.next(true);
    return this.http.post(`https://${environment.sentinel}/sentinel/api/account/${brandId}/app/token?v=1.0&grant_type=client_credentials&client_id=${appKey}&client_secret=${appSecret}`, null, httpOptions)
      .pipe(
        catchError(this.handleError)
      );

  }

  public getConsumerJWS(brandId: string, body: any, httpOptions: any): Observable<Object> {
    console.log("wdw");
    console.log(httpOptions);
    this.loadingSubject.next(true);
    return this.http.post(`https://${environment.idp}/api/account/${brandId}/consumer?v=1.0`, body, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  public openConversation(brandId: string, body: any, headers: any): Observable<Object> {
    console.log(body);
    console.log(headers);
    this.loadingSubject.next(true);

    return this.http.post(`http://${environment.umsDomain}/umsbrige/openconv/${brandId}`, body, headers)
      .pipe(catchError(this.handleError));
  }

  public sendMessage(brandId: string, convId: string, body: any, headers: any): Observable<Object> {
    console.log(body);
    console.log(headers);
    this.loadingSubject.next(true);
    return this.http.post(`http://${environment.umsDomain}/umsbrige/sendraw/${brandId}/conv/${convId}`, body, headers)
      .pipe(catchError(this.handleError));
  }

  public closeConversation(brandId: string, convId: string, headers: any): Observable<Object> {
    console.log(headers);
    this.loadingSubject.next(true);
    return this.http.post(`http://${environment.umsDomain}/umsbrige/close/${brandId}/conv/${convId}`, null, headers)
      .pipe(
        catchError(this.handleError)
      );

  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${JSON.stringify(error.status)}, ` +
        `body was: ${error.error}`);
    }
    // return an ErrorObservable with a user-facing error message
    return new ErrorObservable('Something bad happened; please try again later.');
  }

  private handleResponse(response: Response, body: any, confirmShow: boolean): void {
    const config = new MatSnackBarConfig();
    config.verticalPosition = 'top';
    config.horizontalPosition = 'right';

    let jsonBody: any;

    if (body) {
      jsonBody = JSON.parse(body);
    }

    if (confirmShow) {
      if (response.status < 300 && response.status >= 200) {
        config.duration = 2000;
        this.snackBar.open('Request successfully sent: ' + response.status + ' ' + response.statusText, null, config);

      } else {
        config.panelClass = ['snack-error'];
        this.snackBar.open('[ERROR] Response code: ' + response.status + ' ' + jsonBody.message, 'Close', config);
      }
    }
  }


}
