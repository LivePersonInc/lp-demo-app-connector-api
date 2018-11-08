import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {DomainsService} from "../services/domains.service";
import {environment} from '../../../environments/environment';

@Injectable()
export class DomainHeaderInterceptor implements HttpInterceptor {

  constructor(private domainsService: DomainsService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const domainKey = this.getServiceNameByUrl(req.url);
    let changedReq = req.clone();
    if(environment[domainKey]){
      const domainHeader = this.domainsService.getDomainByServiceName(environment[domainKey]);
      changedReq = req.clone({headers: req.headers.set('LP-DOMAIN', domainHeader)});
    }
    return next.handle(changedReq);
  }

  getServiceNameByUrl(stringUrl: string): string{
    const url = new URL(stringUrl);
    if (url.pathname.split('/')[1] == 'demo') {
      return url.pathname.split('/')[2];
    }
    return url.pathname.split('/')[1];
  }
}
