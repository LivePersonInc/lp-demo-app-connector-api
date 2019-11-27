import {Injectable} from '@angular/core';
import {Observable} from  'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import {environment} from '../../../environments/environment';
import {HttpClient} from "@angular/common/http";
import {HttpService} from "./http.service";
import {LoadingService} from "./loading.service";
import {DomainsService} from "./domains.service";
import {Router} from "@angular/router";

@Injectable()
export class SendApiService extends HttpService {

  private baseURI = `${environment.protocol}://${environment.server}:${environment.port}/demo`;

  constructor(protected snackBar: MatSnackBar,
              protected http: HttpClient,
              protected loadingService:LoadingService,
              protected domainsService: DomainsService,
              protected router: Router)
  {
    super(snackBar,http, loadingService, router);
  }

  public getAppJWT(brandId: string, appKey: string, appSecret: string, httpOptions: any): Observable<Object> {
      const url = `${this.baseURI}/authorization/JWTtoken/${brandId}?client_id=${appKey}&client_secret=${appSecret}`;
      return this.doPost(url, null, httpOptions);
  }

  public getConsumerJWS(brandId: string, body: any, httpOptions: any): Observable<Object> {
    return this.doPost(`${this.baseURI}/authorization/consumerJWS/${brandId}`, body, httpOptions);
  }

  public uploadFile(relativePath: string, tempUrlSig:string, tempUrlExpires: string, body: any): Observable<Object> {
    return this.doPut(`https://${this.domainsService.getDomainByServiceName('swift')}${relativePath}?temp_url_sig=${tempUrlSig}&temp_url_expires=${tempUrlExpires}`, body, {});
  }

  public openConversation(brandId: string, body: any, headers: any): Observable<Object> {
    return this.doPost(`${this.baseURI}/ums/openconv/${brandId}`, body, headers);
  }
  //TODO : should be rename to sendEvent or somehting similar
  public sendMessage(brandId: string, body: any, headers: any): Observable<Object> {
    return this.doPost(`${this.baseURI}/ums/sendraw/${brandId}`, body, headers);
  }

  //TODO: should be removed
  public closeConversation(brandId: string, convId: string, headers: any): Observable<Object> {
    return this.doPost(`${this.baseURI}/ums/close/${brandId}/conv/${convId}`, null, headers);
  }

}
