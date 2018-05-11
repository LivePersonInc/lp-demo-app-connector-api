import { Injectable } from '@angular/core';
import {AuthenticationService} from "./authentication.service";
import {HttpService} from "./http.service";
import {MatSnackBar} from "@angular/material";
import {LoadingService} from "./loading.service";
import {HttpClient} from "@angular/common/http";
import {environment} from '../../../environments/environment';
import {Subject} from "rxjs/Subject";
import {AppInstall} from "../../shared/models/app-installation/appInstall.model";
import {Router} from "@angular/router";

@Injectable()
export class InstallationService extends HttpService {

  public installationSubject = new Subject<any>();
  public appList: Array<AppInstall>;
  public brandId;
  private _selectedApp: AppInstall;
  private headers = {};
  private baseURI = `http://${environment.server}:${environment.server_port}/installation/`;


  constructor(private authenticationService: AuthenticationService,protected snackBar: MatSnackBar,protected http: HttpClient, protected loadingService:LoadingService, protected  router: Router) {
    super(snackBar,http, loadingService, router);
  }

  public init() {
    this.brandId = this.authenticationService.user.brandId;
    this.headers = {'headers':
      {
        'Authorization': `Bearer ${this.authenticationService.user.token}`,
      }
    };
    //this.getAppListList();
  }

  get selectedApp(): AppInstall {
    return this._selectedApp;
  }

  set selectedApp(app: AppInstall) {
    this._selectedApp = app;
    this.installationSubject.next('APP_SELECTED');
  }


  public getAppListList() {
    this.doGet(`${this.baseURI}${this.brandId}`, this.headers).subscribe((data: Array<any>) => {
      this.appList = data.map( app => new AppInstall().deserialize(app));
      this.loadingService.stopLoading();
      this.installationSubject.next('GET_APP_LIST');
    }, error => {
      this.errorResponse(error);
    });
  }

  public installApp(app: AppInstall) {
    this.doPost(`${this.baseURI}${this.brandId}/${app.id}`, JSON.stringify(app),this.headers).subscribe(data => {
      this.loadingService.stopLoading();
      this.installationSubject.next('INSTALL_APP');
    }, error => {
      this.errorResponse(error);
    });
  }

  public updateApp(app: AppInstall) {
    this.doPut(`${this.baseURI}${this.brandId}/${app.id}`, JSON.stringify(app),this.headers).subscribe(data => {
      //this.loadingService.stopLoading();
      this.installationSubject.next('UPDATE_APP');
      this.successResponse('This app was successfully updated');
      this.getAppListList();
    }, error => {
      this.errorResponse(error);
    });
  }

  public reset() {
    this.appList = null;
    this._selectedApp = null;
    this.headers = {};
    this.brandId = null;
    this.installationSubject.next('RESET');
  }

}
