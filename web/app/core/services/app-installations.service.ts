import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {MatSnackBar} from "@angular/material";
import {HttpClient} from "@angular/common/http";
import {LoadingService} from "./loading.service";
import {DomainsService} from "./domains.service";
import {Router} from "@angular/router";
import {Observable, Subject, Subscription} from "rxjs";
import {HttpService} from "./http.service";
import {AppInstall} from "../../shared/models/app-installation/appInstall.model";
import {AuthenticationService} from "./authentication.service";

@Injectable({
  providedIn: 'root'
})
export class AppInstallationsService extends HttpService {
  private selectedAppInstall: AppInstall;
  private brandId: string;
  private headers: object;
  private baseURI: string;

  selectedAppInstallChange: Subject<AppInstall> = new Subject<AppInstall>();

  constructor(protected snackBar: MatSnackBar,
              protected http: HttpClient,
              protected loadingService: LoadingService,
              protected authenticationService: AuthenticationService,
              protected router: Router) {
    super(snackBar, http, loadingService, router);
    this.selectedAppInstallChange.subscribe((value) => {
      this.selectedAppInstall = value;
    });
  }

  public init() {
    console.log('in init');
    this.baseURI = `${environment.protocol}://${environment.server}:${environment.port}/demo/installation/`;
    if (this.authenticationService && this.authenticationService.user) {
      this.brandId = this.authenticationService.user.brandId;
      this.headers = {
        headers: {
          'content-type': 'application/json',
        }
      };
    }
  }

  public getAppInstallations(): Observable<AppInstall[]> {
    const url = `${this.baseURI}${this.brandId}`;
    return this.doGet(url,  this.headers, true);
  }

  public createAppInstallation(appInstall: AppInstall): Observable<AppInstall> {
    const url = `${this.baseURI}${this.brandId}`;
    return this.doPost(url, appInstall, this.headers);
  }

  public updateAppInstallation(appInstall: AppInstall): Observable<AppInstall> {
    const url = `${this.baseURI}${this.brandId}/${appInstall.id}`;
    return this.doPut(url, appInstall, this.headers);
  }

  public getSelectedAppInstall() {
    return this.selectedAppInstall;
  }

  public setSelectedAppInstall(selectedAppInstall: AppInstall) {
    this.selectedAppInstallChange.next(selectedAppInstall);
  }

}
