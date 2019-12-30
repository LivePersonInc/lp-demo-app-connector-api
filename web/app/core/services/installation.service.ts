import {Injectable} from '@angular/core';
import {AuthenticationService} from './authentication.service';
import {HttpService} from './http.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {LoadingService} from './loading.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Subject, throwError} from 'rxjs';
import {AppInstall} from '../../shared/models/app-installation/appInstall.model';
import {Router} from '@angular/router';
import {StateStorage} from '../util/state-storage';
import {catchError, map} from 'rxjs/operators';

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
    super(snackBar, http, loadingService, router);
  }
  
  public init() {
    if (this.authenticationService && this.authenticationService.user) {
      this.brandId = this.authenticationService.user.brandId;
      this.headers = {
        headers:
          {
            'content-type': 'application/json',
          }
      };
      this.restoreState();
    }
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
    this.doGet(`${this.baseURI}${this.brandId}`, this.headers, true).pipe(
      map((data: Array<any>) => {
        this.appList = data.map(app => new AppInstall().deserialize(app)).filter(app => this.isValid(app));
        this.loadingService.stopLoading();
        this.installationSubject.next('GET_APP_LIST');
      }),
      catchError((error: any) => {
        this.errorResponse(error || 'Error in get application list');
        return throwError(new Error(error || 'Error in get application list'));
      })
    ).subscribe();
  }
  
  public installApp(app: AppInstall) {
    this.doPost(`${this.baseURI}${this.brandId}`, JSON.stringify(app), this.headers).pipe(
      map(data => {
        this.loadingService.stopLoading();
        this.installationSubject.next('INSTALL_APP');
      }),
      catchError((error: any) => {
        this.errorResponse(error || 'Installation server error');
        return throwError(new Error(error || 'Installation server error'));
      })
    ).subscribe();
  }
  
  public updateApp(app: AppInstall) {
    this.doPut(`${this.baseURI}${this.brandId}/${app.id}`, JSON.stringify(app), this.headers).pipe(
      map(data => {
        this.installationSubject.next('UPDATE_APP');
        this.successResponse('This app was successfully updated');
        this.getAppListList();
      }), catchError((error: any) => {
        this.errorResponse(error || 'Installation server error during the update');
        return throwError(new Error(error || 'Installation server error during the update'));
      })
    ).subscribe();
  }
  
  public getAppByAppId(appId: string) {
    this.doGet(`${this.baseURI}${this.brandId}/${appId}`, this.headers, true).pipe(
      map(app => {
        this._selectedApp = app;
        this.installationSubject.next('APP_SECRET_FOUND'); // TODO: check this logic
        this.loadingService.stopLoading();
      }), catchError((error: any) => {
        this.errorResponse(error || 'Problem with getting app installation');
        return throwError(new Error(error || 'Problem with getting app installation'));
      })
    ).subscribe();
  }
  
  public uninstallApp(appId: string) {
    this.doDelete(`${this.baseURI}${this.brandId}/${appId}`, this.headers).pipe(
      map(data => {
        this.installationSubject.next('DELETE_APP');
        this.successResponse('This app was successfully Uninstalled');
        this.loadingService.stopLoading();
        this.getAppListList();
      }), catchError((error: any) => {
        this.errorResponse(error || 'Installation server error during the Uninstall');
        return throwError(new Error(error || 'Installation server error during the Uninstall'));
      })
    ).subscribe();
  }
  
  public getAppByIdFromAppList(appId: string): AppInstall {
    console.log('XXXXX');
    if (this.appList && this.appList.length > 0) {
      return this.appList.filter(app => app.client_id = appId)[0];
    }
    return null;
  }
  
  public reset() {
    this.appList = null;
    this._selectedApp = null;
    this.headers = {};
    this.brandId = null;
    this.installationSubject.next('RESET');
  }
  
  private isValid(app: AppInstall): boolean {
    return (app.scope && app.scope === 'msg.consumer');
  }
  
  private updateSelectedAppInState() {
    const state = this.stateManager.getLastStoredStateByBrand(this.brandId);
    state.selectedAppId = this.selectedApp.client_id;
    this.stateManager.storeLastStateInLocalStorage(state, this.brandId);
  }
  
  public restoreState() {
    const state = this.stateManager.getLastStoredStateByBrand(this.brandId);
    if (state && state.selectedAppId) {
      this.getAppByAppId(state.selectedAppId);
    }
  }
  
}
