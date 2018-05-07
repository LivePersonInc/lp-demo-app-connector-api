import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {AccountConfigService} from "../../core/services/account-config.service";
import {InstallationService} from "../../core/services/istallation.service";
import {AppInstall} from "../../shared/models/app-installation/appInstall.model";
import {Webhooks} from "../../shared/models/app-installation/webhooks.model";
import {ISubscription} from "rxjs/Subscription";

@Component({
  selector: 'lp-config-check',
  templateUrl: './lp-config-check.component.html',
  styleUrls: ['./lp-config-check.component.scss']
})
export class LpConfigCheckComponent implements OnInit, OnDestroy {

  @Output()
  public completed = new EventEmitter();
  public isAsyncMessagingActive:boolean;
  public currentAppInstallation:AppInstall;
  public webhooks: Webhooks;

  private installationSubscription:ISubscription;
  private acSubscription:ISubscription;

  constructor(private accountConfigService:AccountConfigService, private  installationService: InstallationService) { }

  ngOnInit() {
    this.currentAppInstallation = this.installationService.selectedApp;
    this.isAsyncMessagingActive = this.accountConfigService.isAsyncMessagingActive;

    this.installationSubscription = this.installationService.installationSubject.subscribe(event => {
      if( event === 'APP_SELECTED'){
        this.currentAppInstallation = this.installationService.selectedApp;
        this.initWebhooks();
      }
      if( event === 'UPDATE_APP'){
        this.currentAppInstallation = this.installationService.selectedApp;
        this.initWebhooks();
      }

    });

    this.acSubscription = this.accountConfigService.acSubject.subscribe( event => {
      if( event === 'GET_LIST'){
        this.isAsyncMessagingActive = this.accountConfigService.isAsyncMessagingActive;
      }
    });

    this.initWebhooks();
  }

  ngOnDestroy() {
    if(this.installationSubscription) this.installationSubscription.unsubscribe();
    if(this.acSubscription) this.acSubscription.unsubscribe();
  }

  private initWebhooks() {
    this.webhooks = new Webhooks();
    this.webhooks.initEndpoints();
    if(this.installationService.selectedApp && this.installationService.selectedApp.capabilities &&  this.installationService.selectedApp.capabilities.webhooks) {
      this.webhooks.deserialize(this.installationService.selectedApp.capabilities.webhooks);
    }
  }



}
