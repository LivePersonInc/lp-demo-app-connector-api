import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {DomainsService} from "../services/domains.service";

@Injectable()
export class DomainHeaderInterceptor implements HttpInterceptor {

  constructor(private domainsService: DomainsService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const changedReq = req.clone({headers: req.headers.set('DOMAIN', 'MyHeaderValue')});
    console.log(req.url);
    return next.handle(changedReq);
  }
}
