import {AppInstall} from '../models/app-installation/appInstall.model';
import appInstallationListJson from './appInstallationList.json';
import {Subject} from 'rxjs';

export class InstallationServiceStub {
  
  installationSubject = new Subject<any>();
  appList: Array<AppInstall>;
  
  getAppListList() {
    this.appList = appInstallationListJson;
    this.installationSubject.next('GET_APP_LIST');
    
  }
  
  installApp(app: AppInstall) {
    this.installationSubject.next('INSTALL_APP');
  }
  
  updateApp(app: AppInstall) {
    this.installationSubject.next('UPDATE_APP');
  }
  
  uninstallApp(app: AppInstall) {
  
  }
}
