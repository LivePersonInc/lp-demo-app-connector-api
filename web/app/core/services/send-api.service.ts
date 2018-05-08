import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {MatSnackBar} from '@angular/material';
import {environment} from '../../../environments/environment';
import {HttpClient} from "@angular/common/http";
import {HttpService} from "./http.service";
import {LoadingService} from "./loading.service";
import {DomainsService} from "./domains.service";

@Injectable()
export class SendApiService extends HttpService {

  private baseURI = `http://${environment.server}:${environment.server_port}/ums/`;


  constructor(protected snackBar: MatSnackBar,
              protected http: HttpClient,
              protected loadingService:LoadingService,
              protected domainsService: DomainsService) {
    super(snackBar,http, loadingService);
  }

  public getAppJWT(brandId: string, appKey: string, appSecret: string, httpOptions: any): Observable<Object> {
    return this.doPost(`https://${this.domainsService.getDomainByServiceName('sentinel')}/sentinel/api/account/${brandId}/app/token?v=1.0&grant_type=client_credentials&client_id=${appKey}&client_secret=${appSecret}`, null, httpOptions);
  }

  public getConsumerJWS(brandId: string, body: any, httpOptions: any): Observable<Object> {
    return this.doPost(`https://${this.domainsService.getDomainByServiceName('idp')}/api/account/${brandId}/consumer?v=1.0`, body, httpOptions);
  }

  public openConversation(brandId: string, body: any, headers: any): Observable<Object> {
    return this.doPost(`${this.baseURI}openconv/${brandId}`, body, headers);
  }

  public sendMessage(brandId: string, convId: string, body: any, headers: any): Observable<Object> {
    return this.doPost(`${this.baseURI}sendraw/${brandId}`, body, headers);
  }

  public closeConversation(brandId: string, convId: string, headers: any): Observable<Object> {
    return this.doPost(`${this.baseURI}close/${brandId}/conv/${convId}`, null, headers);
  }

}
