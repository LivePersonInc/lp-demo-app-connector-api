import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import {SendApiService} from "./send-api.service";
import {ErrorObservable} from "rxjs/observable/ErrorObservable";
import {catchError} from "rxjs/operators";

@Injectable()
export class AuthenticationService {

  private token: string;

  constructor(private http: HttpClient, private sendApiService: SendApiService) { }

  //Barer Token
  public login(brandId: string, username: string, password: string) {
    this.sendApiService.startLoading();
    console.log("LOGFIN");
    this.http.post<any>(`https://ctvr-ano041.dev.lprnd.net/api/account/${brandId}/login`, { username: username, password: password }, {Accept: "application/json", "Content-Type": "application/json"})
      .pipe(
        catchError(this.handleError)
      ).subscribe(res => {
        console.log(res);
         this.sendApiService.stopLoading();
      },error => {
        this.sendApiService.stopLoading();

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
