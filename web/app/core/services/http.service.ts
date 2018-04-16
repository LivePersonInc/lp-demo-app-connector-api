import { Injectable } from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {ErrorObservable} from "rxjs/observable/ErrorObservable";
import * as Client from 'node-rest-client';
@Injectable()
export class HttpService {

  constructor(public snackBar: MatSnackBar, private http: HttpClient) { }

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
