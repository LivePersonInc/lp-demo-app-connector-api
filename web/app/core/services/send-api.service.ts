import {Injectable} from '@angular/core';
import {Observable} from  'rxjs';
import {MatSnackBar} from '@angular/material';
import {environment} from '../../../environments/environment';
import {HttpClient} from "@angular/common/http";
import {HttpService} from "./http.service";
import {LoadingService} from "./loading.service";
import {DomainsService} from "./domains.service";
import {Router} from "@angular/router";

@Injectable()
export class SendApiService extends HttpService {

  private baseURI = `${environment.protocol}://${environment.server}:${environment.port}/demo/ums/`;


  constructor(protected snackBar: MatSnackBar,
              protected http: HttpClient,
              protected loadingService:LoadingService,
              protected domainsService: DomainsService,
              protected router: Router)
  {
    super(snackBar,http, loadingService, router);
  }

  public getAppJWT(brandId: string, appKey: string, appSecret: string, httpOptions: any): Observable<Object> {
    return this.doPost(`https://${this.domainsService.getDomainByServiceName('sentinel') || 'ca-a.sentinel.liveperson.net'}/sentinel/api/account/${brandId}/app/token?v=1.0&grant_type=client_credentials&client_id=${appKey}&client_secret=${appSecret}`, null, httpOptions);
  }

  public getConsumerJWS(brandId: string, body: any, httpOptions: any): Observable<Object> {
    return this.doPost(`https://${this.domainsService.getDomainByServiceName('idp')}/api/account/${brandId}/consumer?v=1.0`, body, httpOptions);
  }

  public uploadFile(relativePath: string, tempUrlSig:string, tempUrlExpires: string, body: any): Observable<Object> {
    return this.doPut(`https://${this.domainsService.getDomainByServiceName('swift')}${relativePath}?temp_url_sig=${tempUrlSig}&temp_url_expires=${tempUrlExpires}`, body, {});
  }

  public openConversation(brandId: string, body: any, headers: any): Observable<Object> {
    return this.doPost(`${this.baseURI}openconv/${brandId}`, body, headers);
  }

  public sendMessage(brandId: string, body: any, headers: any): Observable<Object> {
    return this.doPost(`${this.baseURI}sendraw/${brandId}`, body, headers);
  }

  public closeConversation(brandId: string, convId: string, headers: any): Observable<Object> {
    return this.doPost(`${this.baseURI}close/${brandId}/conv/${convId}`, null, headers);
  }

}
