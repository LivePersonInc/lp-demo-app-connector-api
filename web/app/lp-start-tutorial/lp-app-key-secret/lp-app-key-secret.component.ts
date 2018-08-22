import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {InstallationService} from "../../core/services/istallation.service";
import {AppInstall} from "../../shared/models/app-installation/appInstall.model";
import {MatSelectChange} from "@angular/material";
import {Router} from "@angular/router";
import {ISubscription} from "rxjs/Subscription";
import {LoadingService} from "../../core/services/loading.service";
import {StateManager} from "../../core/helpers/state-manager";

@Component({
  selector: 'lp-app-key-secret',
  templateUrl: './lp-app-key-secret.component.html',
  styleUrls: ['./lp-app-key-secret.component.scss']
})
export class LpAppKeySecretComponent implements OnInit, OnDestroy {

  @Output()
  public completed = new EventEmitter();
  public isCompleted: boolean;
  public selectedApp: AppInstall;
  public appList = [];
  public isLoading: boolean;

  private installationSubscription:ISubscription;

  constructor(
    private installationService:InstallationService,
    private router: Router,
    private loadingService: LoadingService,
    private stateManager: StateManager) { }

  ngOnInit() {
    if(this.installationService.appList) {
      this.appList = this.installationService.appList;
    }
    this.installationService.installationSubject.subscribe(event => {
      if(event === 'GET_APP_LIST'){
        this.appList = this.installationService.appList;
      }
    });

    this.loadingService.isLoadingSubscription().subscribe( event => {
      this.isLoading = event;
    })
  }

  ngOnDestroy(){
    if(this.installationSubscription) this.installationSubscription.unsubscribe();
  }

  public onSelectionChange(event: MatSelectChange) {
    if(event.value instanceof AppInstall){
      this.installationService.selectedApp = this.selectedApp;
      this.setSelectedAppInState();
      this.completed.emit(true);

    }else{
      this.completed.emit(false);
    }
  }

  public redirectToHome(){
    this.router.navigateByUrl('/home');
  }

  private setSelectedAppInState() {
    let appState = this.stateManager.getLastStoredStateByBrand(this.installationService.brandId);
    appState.selectedApp = this.selectedApp;
    this.stateManager.storeLastStateInLocalStorage(appState, this.installationService.brandId);
  }
}
