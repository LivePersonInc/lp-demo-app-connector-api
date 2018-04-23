import { Injectable } from '@angular/core';
import {AuthenticationService} from "./authentication.service";
import {HttpService} from "./http.service";
import {MatSnackBar} from "@angular/material";
import {LoadingService} from "./loading.service";
import {HttpClient} from "@angular/common/http";
import {environment} from '../../../environments/environment';
import {Subject} from "rxjs/Subject";
import {AppInstall} from "../../shared/models/app-installation/appInstall.model";

@Injectable()
export class InstallationService extends HttpService {

  public istallationSubject = new Subject<any>();
  public appList: Array<AppInstall>;
  private _selectedApp: AppInstall;
  private headers = {};
  public brandId;

  constructor(private authenticationService: AuthenticationService,protected snackBar: MatSnackBar,protected http: HttpClient, protected loadingService:LoadingService) {
    super(snackBar,http, loadingService);
  }

  public init() {
   /* this.authenticationService.userLoggedSubject.subscribe( event =>  {
      if(event === 'LOGGED-IN'){
        console.log("LOGGDE_IN");
        this.brandId = this.authenticationService.user.brandId;
        this.headers = {'headers':
          {
            'Authorization': `Bearer ${this.authenticationService.getUser().token}`,
          }
        };
        this.getAppListList();
      }
    });*/

    console.log("LOGGDE_IN");
    this.brandId = this.authenticationService.user.brandId;
    this.headers = {'headers':
      {
        'Authorization': `Bearer ${this.authenticationService.getUser().token}`,
      }
    };
    this.getAppListList();
  }

  get selectedApp(): AppInstall {
    return this._selectedApp;
  }

  set selectedApp(app: AppInstall) {
    this._selectedApp = app;
    this.istallationSubject.next('APP_SELECTED');
  }


  public getAppListList() {

    this.doGet(`http://${environment.umsDomain}/installation/${this.brandId}`, this.headers).subscribe((data: Array<any>) => {
      this.appList = data.map( app => new AppInstall().deserialize(app));
      console.log(this.appList);
      this.loadingService.stopLoading();
      this.istallationSubject.next('GET_APP_LIST');
    }, error => {
      this.errorResponse(error);
    });
  }

  public installApp(app: AppInstall) {
    this.doPost(`http://${environment.umsDomain}/installation/${this.brandId}/${app.id}`, JSON.stringify(app),this.headers).subscribe(data => {
      this.loadingService.stopLoading();
      this.istallationSubject.next('INSTALL_APP');
    }, error => {
      this.errorResponse(error);
    });
  }

  public updateApp(app: AppInstall) {
    this.doPut(`http://${environment.umsDomain}/installation/${this.brandId}/${app.id}`, JSON.stringify(app),this.headers).subscribe(data => {
      this.loadingService.stopLoading();
      this.istallationSubject.next('UPDATE_APP');
    }, error => {
      this.errorResponse(error);
    });
  }

}
