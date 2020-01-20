import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {LoadingService} from './loading.service';
import {Router} from '@angular/router';

@Injectable()
export class HttpService {
  protected snackBarConfig = new MatSnackBarConfig();
  
  constructor(protected snackBar: MatSnackBar, protected http: HttpClient, protected loadingService: LoadingService, protected router: Router) {
    this.snackBarConfig.verticalPosition = 'top';
    this.snackBarConfig.horizontalPosition = 'right';
  }
  
  public doPost(url: string, body: any, httpOptions: any): Observable<any> {
    this.loadingService.startLoading();
    return this.http.post(url, body, httpOptions);
  }
  
  public doPut(url: string, body: any, httpOptions: any): Observable<any> {
    this.loadingService.startLoading();
    return this.http.put(url, body, httpOptions);
  }
  
  public doGet(url: string, httpOptions: any, loading: boolean): Observable<any> {
    if (loading) {
      this.loadingService.startLoading();
    }
    return this.http.get(url, httpOptions);
  }
  
  public doDelete(url: string, httpOptions: any): Observable<any> {
    return this.http.delete(url, httpOptions);
  }
  
  public errorResponse(error: (any | HttpErrorResponse), logout: boolean) {
    this.snackBarConfig.duration = null;
    this.snackBarConfig.panelClass = ['snack-error'];
    if (error instanceof HttpErrorResponse) {
      this.snackBar.open('[ERROR]: ' + error.status + ' ' +
        (error.error.message || error.statusText || error.error ), 'Close', this.snackBarConfig).afterOpened().subscribe(() => {
        if (error.status === 401 && logout) {
          this.router.navigateByUrl('/logout');
        }
      });
      
    } else {
      console.log(JSON.stringify(error));
      this.snackBar.open('[ERROR]: ' + error, 'Close', this.snackBarConfig);
    }
    this.loadingService.stopLoading();
    this.activateLoadingService();
  }
  
  public successResponse(message: string) {
    this.loadingService.stopLoading();
    this.snackBarConfig.duration = 2000;
    this.snackBar.open('Request successfully SENT: ' + message, null, this.snackBarConfig);
  }
  
  public customResponse(message: string) {
    this.loadingService.stopLoading();
    this.snackBarConfig.duration = 2000;
    this.snackBar.open(message, null, this.snackBarConfig);
  }
  
  public deactivateLoadingService() {
    this.loadingService.deactivateLoadingService();
  }
  
  public activateLoadingService() {
    this.loadingService.activateLoadingService();
  }
  
}
