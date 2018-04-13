import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import {SendApiService} from "./send-api.service";
import {ErrorObservable} from "rxjs/observable/ErrorObservable";
import {catchError} from "rxjs/operators";
import {Subject} from "rxjs/Subject";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material";

@Injectable()
export class AuthenticationService {
//le92127075
  private token: string;
  public snackBarConfing : MatSnackBarConfig;
  public userLoggedSubject = new Subject<boolean>();

  constructor(private http: HttpClient, private sendApiService: SendApiService, private snackBar: MatSnackBar) {
    this.snackBarConfing = new MatSnackBarConfig();
    this.snackBarConfing.verticalPosition = 'top';
    this.snackBarConfing.horizontalPosition = 'right';
  }

  //Barer Token
  public login(brandId: string, username: string, password: string): any {
    this.sendApiService.startLoading();
    console.log("LOGFIN");
     return this.http.post<any>(`https://ctvr-ano041.dev.lprnd.net/api/account/${brandId}/login`, { username: username, password: password }, {Accept: "application/json", "Content-Type": "application/json"})
      .pipe(
        catchError(this.handleError)
      ).subscribe(res => {
        console.log(res);
        this.token = res.bearer;
         this.userLoggedSubject.next(true);
         this.snackBarConfing.duration = 2000;
         this.snackBar.open('Authentication was successful ', null, this.snackBarConfing);
         this.sendApiService.stopLoading();
      },error => {
        this.sendApiService.stopLoading();
         this.snackBarConfing.panelClass = ['snack-error'];
         this.snackBar.open('[ERROR] Response code: ' + error, 'Close', this.snackBarConfing);
      });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
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


}


