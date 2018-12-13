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
import {StateStorage} from "../util/state-storage";
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs/Observable';

@Injectable()
export class InstallationService extends HttpService {

  public installationSubject = new Subject<any>();
  public appList: Array<AppInstall>;
  public brandId;
  private _selectedApp: AppInstall;
  private headers = {};
  private baseURI = `${environment.protocol}://${environment.server}:${environment.port}/demo/installation/`;


  constructor(protected authenticationService: AuthenticationService,
              protected snackBar: MatSnackBar,
              protected http: HttpClient,
              protected loadingService: LoadingService,
              protected stateManager: StateStorage,
              protected router: Router) {
    super(snackBar,http, loadingService, router);
  }

  public init() {
    this.brandId = this.authenticationService.user.brandId;
    this.headers = {'headers':
      {
        'Authorization': `Bearer ${this.authenticationService.user.token}`,
        'content-type': 'application/json',
      }
    };
    this.restoreState();
  }

  get selectedApp(): AppInstall {
    return this._selectedApp;
  }

  set selectedApp(app: AppInstall) {
    this._selectedApp = app;
    this.updateSelectedAppInState();
    this.installationSubject.next('APP_SELECTED');
  }

  public getAppListList() {
    this.doGet(`${this.baseURI}${this.brandId}`, this.headers, true).subscribe((data: Array<any>) => {
      this.appList = data.map( app => new AppInstall().deserialize(app)).filter( app => this.isValid(app));
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

  public getAppByAppId(appId: string) {
    this.doGet(`${this.baseURI}${this.brandId}/${appId}`, this.headers, true).subscribe(app => {
      this._selectedApp = app;
      this.installationSubject.next('APP_SECRET_FOUND');
      this.loadingService.stopLoading();
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

  private isValid(app: AppInstall): boolean{
    return !(!app.enabled || (!app.scope || app.scope !== 'msg.consumer'));
  }

  private updateSelectedAppInState() {
    let state = this.stateManager.getLastStoredStateByBrand(this.brandId);
    state.selectedAppId = this.selectedApp.client_id;
    this.stateManager.storeLastStateInLocalStorage(state, this.brandId);
  }

  public restoreState() {
    let state = this.stateManager.getLastStoredStateByBrand(this.brandId);
    if(state && state.selectedAppId){
        this.getAppByAppId(state.selectedAppId);
    }
  }

}
