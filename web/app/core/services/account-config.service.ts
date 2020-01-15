import {Injectable} from '@angular/core';
import {AuthenticationService} from './authentication.service';
import {HttpService} from './http.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {LoadingService} from './loading.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Subject, throwError} from 'rxjs';
import {Router} from '@angular/router';
import {catchError, map} from 'rxjs/operators';

@Injectable()
export class AccountConfigService extends HttpService {
  
  public acSubject = new Subject<string>();
  public isAsyncMessagingActive: boolean;
  public brandId = '';
  
  private baseURI = `${environment.protocol}://${environment.server}:${environment.port}/demo/property/asyncmsg/`;
  
  constructor(protected authenticationService: AuthenticationService,
              protected snackBar: MatSnackBar,
              protected http: HttpClient,
              protected loadingService: LoadingService,
              protected router: Router) {
    super(snackBar, http, loadingService, router);
    
  }
  
  public init() {
    if (this.authenticationService && this.authenticationService.user) {
      this.brandId = this.authenticationService.user.brandId;
    }
  }
  
  public getIsAsyncMessagingPropActive() {
    this.doGet(`${this.baseURI}${this.brandId}`, {}, true).pipe(
      map(result => {
        this.isAsyncMessagingActive = result;
        this.loadingService.stopLoading();
        this.acSubject.next('DONE');
      }),
      catchError(error => {
        this.errorResponse(error);
        return throwError(new Error(error || 'An error occurred, please try again later'));
      })
    ).subscribe();
  }
  
  public reset() {
    this.isAsyncMessagingActive = false;
    this.brandId = '';
  }
  
}
