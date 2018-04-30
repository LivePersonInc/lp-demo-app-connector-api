import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {DomainsService} from "../services/domains.service";
import {environment} from '../../../environments/environment';

@Injectable()
export class DomainHeaderInterceptor implements HttpInterceptor {
  /*
  Services names to get the domain with the CSDS
  authentication: "agentVep",
  installation:"accountConfigReadWrite",
  ums:"asyncMessaging",
  account: "accountConfigReadWrite"
  */
  constructor(private domainsService: DomainsService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const domainKey = this.getServiceNameByUrl(req.url);
    let changedReq = req.clone();
    if(environment[domainKey]){
      console.log(environment[domainKey]);
      const domainHeader = this.domainsService.getDomainByServiceName(environment[domainKey]);
      console.log(domainHeader);
      changedReq = req.clone({headers: req.headers.set('LP-DOMAIN', domainHeader)});
    }
    return next.handle(changedReq);
  }

  getServiceNameByUrl(stringUrl: string): string{
    const url = new URL(stringUrl);
    return url.pathname.split('/')[1];
  }
}
