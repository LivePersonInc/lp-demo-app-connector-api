import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, finalize} from "rxjs/operators";
import {ErrorObservable} from "rxjs/observable/ErrorObservable";
import * as Client from 'node-rest-client';
import {LoadingService} from "./loading.service";
@Injectable()
export class HttpService {
  protected snackBarConfig = new MatSnackBarConfig();

  constructor(protected snackBar: MatSnackBar, protected http: HttpClient, protected loadingService:LoadingService) {
    this.snackBarConfig.verticalPosition = 'top';
    this.snackBarConfig.horizontalPosition = 'right';
    this.snackBarConfig.duration = 2000;
  }


  public doPost(url:string, body:any, httpOptions: any ):  Observable<ArrayBuffer> {
    this.loadingService.startLoading();
    return this.http.post(url, body, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  public doGet(url:string, httpOptions: any ):  Observable<ArrayBuffer> {
    this.loadingService.startLoading();
    return this.http.get(url, httpOptions)
      .pipe(
        catchError(this.handleError),
      );
  }

  protected handleError(error: HttpErrorResponse) {
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

  protected handleResponse(response: Response, body: any, confirmShow: boolean): void {
    let jsonBody: any;

    if (body) {
      jsonBody = JSON.parse(body);
    }

    if (confirmShow) {
      if (response.status < 300 && response.status >= 200) {
        this.snackBar.open('Request successfully sent: ' + response.status + ' ' + response.statusText, null, this.snackBarConfig);

      } else {
        this.snackBarConfig.panelClass = ['snack-error'];
        this.snackBar.open('[ERROR] Response code: ' + response.status + ' ' + jsonBody.message, 'Close', this.snackBarConfig);
      }
    }
  }

  protected errorResponse(error) {
    this.loadingService.stopLoading();
    this.snackBarConfig.panelClass = ['snack-error'];
    this.snackBar.open('[ERROR] Response code: ' + error, 'Close', this.snackBarConfig);
  }

  protected successResponse(message) {
    this.loadingService.stopLoading();
    // this.snackBarConfig.duration = 2000;
    this.snackBar.open('Request successfully sent: ' + message, null, this.snackBarConfig);
  }




}
