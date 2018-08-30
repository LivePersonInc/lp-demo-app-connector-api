import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {ErrorObservable} from "rxjs/observable/ErrorObservable";
import {LoadingService} from "./loading.service";
import {Router} from "@angular/router";

@Injectable()
export class HttpService {
  protected snackBarConfig = new MatSnackBarConfig();

  constructor(protected snackBar: MatSnackBar, protected http: HttpClient, protected loadingService:LoadingService, protected router: Router) {
    this.snackBarConfig.verticalPosition = 'top';
    this.snackBarConfig.horizontalPosition = 'right';
  }


  public doPost(url:string, body:any, httpOptions: any ):  Observable<any> {
    this.loadingService.startLoading();
    return this.http.post(url, body, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  public doPut(url:string, body:any, httpOptions: any ):  Observable<any> {
    this.loadingService.startLoading();
    return this.http.put(url, body, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  public doGet(url:string, httpOptions: any ):  Observable<any> {
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
      console.log(error);
    }
    // return an ErrorObservable with a user-facing error message
    return new ErrorObservable(
      error || 'An error occurred, please try again later'
    );
  }

  public errorResponse(error: (string | HttpErrorResponse)) {
    this.snackBarConfig.duration = null;
    this.snackBarConfig.panelClass = ['snack-error'];
    if (error instanceof HttpErrorResponse) {
      this.snackBar.open('[ERROR]: ' + error.status + " " + (error.error.message || error.statusText || error.error ), 'Close', this.snackBarConfig);
      if(error.status === 401) {
        this.router.navigateByUrl('/logout');
      }
    }else {
      this.snackBar.open('[ERROR]: ' + error, 'Close', this.snackBarConfig);
    }
    this.loadingService.stopLoading();

  }

  public successResponse(message: string) {
    this.loadingService.stopLoading();
    this.snackBarConfig.duration = 2000;
    this.snackBar.open('Request successfully SENT: ' + message, null, this.snackBarConfig);
  }

}
