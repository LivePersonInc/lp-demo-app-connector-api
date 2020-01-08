import {Injectable} from '@angular/core';
import {AuthenticationService} from './authentication.service';
import {HttpService} from './http.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {LoadingService} from './loading.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';
import {catchError, map, timeout} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Injectable()
export class HistoryService extends HttpService {
  
  public historySubject = new Subject<any>();
  public history;
  public brandId;
  private baseURI = `${environment.protocol}://${environment.server}:${environment.port}/demo/history/`;
  
  
  constructor(private authenticationService: AuthenticationService, protected snackBar: MatSnackBar,
              protected http: HttpClient, protected loadingService: LoadingService, protected  router: Router) {
    super(snackBar, http, loadingService, router);
  }
  
  public init() {
    this.brandId = this.authenticationService.user.brandId;
  }
  
  public getHistoryByConsumerId(consumerId: string) {
    this.doGet(`${this.baseURI}${this.brandId}/consumer/${consumerId}`, {}, true).pipe(
      timeout(10000),
      map((data: Array<any>) => {
        this.history = data;
        this.loadingService.stopLoading();
        this.historySubject.next('GET_CONV_HISTORY');
      }), catchError((error: any) => {
        this.errorResponse('Error getting Consumer History');
        return throwError(new Error(error || 'Error getting Consumer History'));
      })
    ).subscribe();
  }
  
}
