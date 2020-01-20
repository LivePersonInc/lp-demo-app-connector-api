import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpClient} from '@angular/common/http';
import {LoadingService} from './loading.service';
import {environment} from '../../../environments/environment';
import {Subject, throwError} from 'rxjs';
import {Router} from '@angular/router';
import {catchError, map} from 'rxjs/operators';

@Injectable()
export class DomainsService extends HttpService {
  public domainsSubject = new Subject();
  public domains = [];
  
  constructor(protected snackBar: MatSnackBar, protected http: HttpClient,
              protected loadingService: LoadingService, protected router: Router) {
    super(snackBar, http, loadingService, router);
  }
  
  // Currently only needed for upload files
  public getDomainList(brandId: string) {
    this.doGet(`${environment.protocol}://${environment.server}:${environment.port}/domains/csds/${brandId}`, {}, true).pipe(
      map((data) => {
        const length = data.baseURIs.length;
        for (let i = 0; i < length; i++) {
          this.domains[data.baseURIs[i].service] = data.baseURIs[i].baseURI;
        }
        this.domainsSubject.next('READY');
      }), catchError((error: any) => {
        this.errorResponse('Problem with getting session object', true);
        return throwError(new Error(error || 'Problem with getting session object'));
      })
    ).subscribe();
  }
  
  public getDomainByServiceName(serviceName: string) {
    return this.domains[serviceName];
  }
  
}
