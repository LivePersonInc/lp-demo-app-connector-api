import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {fadeInAnimation} from '../../shared/animations/lp-animations';
import {MatDialog} from '@angular/material/dialog';
import {AuthenticationService} from '../../core/services/authentication.service';
import {LoadingService} from '../../core/services/loading.service';
import {AppInstall} from '../../shared/models/app-installation/appInstall.model';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {LpInstallationDialogComponent} from '../lp-app-installations/lp-installation-dialog/lp-installation-dialog.component';
import {InstallationService} from '../../core/services/installation.service';
import {LpEditAppIntallationDialogComponent} from '../lp-app-installations/lp-edit-app-intallation-dialog/lp-edit-app-intallation-dialog.component';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {MatSort} from '@angular/material/sort';
import {LpConfirmationDialogComponent} from '../lp-confirmation-dialog/lp-confirmation-dialog.component';

@Component({
  selector: 'lp-home',
  templateUrl: './lp-home.component.html',
  styleUrls: ['./lp-home.component.scss'],
  animations: [fadeInAnimation],
  host: {'[@fadeInAnimation]': ''}
})
export class LpHomeComponent implements OnInit, OnDestroy {
  public avaliableApplicationInstallation: AppInstall[];
  private appInstallSubscription: Subscription;
  private dialogRefSubscription: Subscription;
  
  public dataSource: MatTableDataSource<AppInstall>;
  public displayedColumns: string[] = ['enabled', 'client_id_issued_at', 'name', 'client_secret', 'description', 'menu'];
  
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  
  constructor(public installationService: InstallationService,
              private authenticationService: AuthenticationService,
              private router: Router,
              private dialog: MatDialog,
              public loadingService: LoadingService) {
  }
  
  ngOnInit() {
    // needed when browser refresh
    this.authenticationService.userLoggedSubject.subscribe(event => {
      if (event === 'USER-SET') {
        this.installationService.init();
        this.getAppInstallations();
      }
    });
    
    if (this.authenticationService.user) {
      this.getAppInstallations();
    }
    
    this.appInstallSubscription = this.installationService.installationSubject.subscribe(val => {
      if (val === 'GET_APP_LIST') {
        this.avaliableApplicationInstallation = this.installationService.appList;
        this.dataSource = new MatTableDataSource<AppInstall>(this.avaliableApplicationInstallation);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
      if (val === 'INSTALL_APP' || val === 'UPDATE_APP') {
        this.getAppInstallations();
      }
    });
  }
  
  ngOnDestroy() {
    if (this.appInstallSubscription) {
      this.appInstallSubscription.unsubscribe();
    }
    if (this.dialogRefSubscription) {
      this.dialogRefSubscription.unsubscribe();
    }
  }
  
  public applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  public getAppInstallations() {
    this.installationService.getAppListList();
  }
  
  public openDemo(app: AppInstall) {
    this.installationService.setSelectedApp(app);
    this.router.navigateByUrl('demo/' + app.client_id);
  }
  
  public openAppInstallationDialog(appInstallation) {
    const dialogRef = this.dialog.open(LpInstallationDialogComponent, {data: {appInstallation: appInstallation}, maxWidth: '1000'});
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.data) {
        this.loadingService.startLoading();
        this.installationService.installApp(result.data);
      }
    });
  }
  
  public openAppInstallationEditDialog(appInstallation) {
    const dialogRef = this.dialog.open(LpEditAppIntallationDialogComponent, {data: {appInstallation: appInstallation}, maxWidth: '1000'});
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.data) {
        this.loadingService.startLoading();
        this.installationService.updateApp(result.data);
      }
    });
  }
  
  public uninstallApp(app: AppInstall) {
    const dialogRef = this.dialog.open(LpConfirmationDialogComponent);
    
    dialogRef.componentInstance.title = 'Uninstall Application';
    dialogRef.componentInstance.message = 'This action will remove completely you application. Are you sure?';
    
    this.dialogRefSubscription = dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.loadingService.startLoading();
        this.installationService.uninstallApp(app.client_id);
      }
    });
  }
  
  public disableApp(app: AppInstall) {
    this.loadingService.startLoading();
    const appCopy = new AppInstall().deserialize(app);
    appCopy.enabled = false;
    this.installationService.updateApp(appCopy);
  }
  
  public enableApp(app: AppInstall) {
    this.loadingService.startLoading();
    const appCopy = new AppInstall().deserialize(app);
    appCopy.enabled = true;
    this.installationService.updateApp(appCopy);
  }
  
  public isDemoApp(app: AppInstall): boolean {
    return app.enabled;
  }
  
}
