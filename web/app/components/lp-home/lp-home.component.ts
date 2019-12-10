import {Component, OnInit, ViewChild} from "@angular/core";
import {fadeInAnimation} from "../../shared/animations/lp-animations";
import { MatDialog } from "@angular/material/dialog";
import {AuthenticationService} from "../../core/services/authentication.service";
import {LoadingService} from "../../core/services/loading.service";
import {AppInstall} from "../../shared/models/app-installation/appInstall.model";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import { LpInstallationDialogComponent } from '../lp-app-installations/lp-installation-dialog/lp-installation-dialog.component';
import {InstallationService} from "../../core/services/installation.service";
import {LpEditAppIntallationDialogComponent} from "../lp-app-installations/lp-edit-app-intallation-dialog/lp-edit-app-intallation-dialog.component";
@Component({
  selector: 'lp-home',
  templateUrl: './lp-home.component.html',
  styleUrls: ['./lp-home.component.scss'],
  animations: [fadeInAnimation],
  host: {'[@fadeInAnimation]': ''}
})
export class LpHomeComponent implements OnInit {
  public avaliableApplicationInstallation: AppInstall[];
  private appInstallSubscription: Subscription;
  displayedColumns: string[] = ['enabled', 'name',"client_secret", "description", 'created_at', 'menu'];
  
  constructor(public installationService: InstallationService,
              private authenticationService: AuthenticationService,
              private router: Router,
              private dialog: MatDialog,
              public loadingService: LoadingService) {}

  ngOnInit() {
    //needed when browser refresh
    this.authenticationService.userLoggedSubject.subscribe(ev => {
      this.installationService.init();
      this.getAppInstallations();
    });
  
    if(this.authenticationService.user) {
      this.getAppInstallations();
    }
    
    this.appInstallSubscription = this.installationService.installationSubject.subscribe( val => {
      if(val === 'GET_APP_LIST'){
        this.avaliableApplicationInstallation = this.installationService.appList;
      }
      if(val === 'INSTALL_APP') {
        this.getAppInstallations();
      }
    });

  }
  
  ngOnDestroy() {
    if (this.appInstallSubscription) {
      this.appInstallSubscription.unsubscribe();
    }
  }
  
  public getAppInstallations() {
    this.installationService.getAppListList();
  }
  
  public openDemo(appInstallation: AppInstall) {
    console.log(appInstallation);
    this.installationService.selectedApp = appInstallation;
    this.router.navigateByUrl('demo/' + appInstallation.client_id);
  }
  
  public openAppInstallationDialog(appInstallation) {
  
    const dialogRef = this.dialog.open(LpInstallationDialogComponent, {data: {appInstallation: appInstallation},   maxWidth:'1000',
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result.data) {
        this.loadingService.startLoading();
        this.installationService.installApp(result.data)
      }
    })
  }
  
  public openAppInstallationEditDialog(appInstallation) {
    
    const dialogRef = this.dialog.open(LpEditAppIntallationDialogComponent, {data: {appInstallation: appInstallation},   maxWidth:'1000',
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result.data) {
        this.loadingService.startLoading();
        this.installationService.installApp(result.data)
      }
    })
  }
  
  
  public uninstallApp(app: AppInstall){
    console.log(app);
    //  this.loadingService.startLoading();
  }
  
  public isDemoApp(app: AppInstall):boolean {
    return app.enabled;
    // TODO:
  }
  
}
