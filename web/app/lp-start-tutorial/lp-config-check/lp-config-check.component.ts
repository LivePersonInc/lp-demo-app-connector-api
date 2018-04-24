import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AccountConfigService} from "../../core/services/account-config.service";
import {InstallationService} from "../../core/services/istallation.service";
import {AppInstall} from "../../shared/models/app-installation/appInstall.model";
import {Webhooks} from "../../shared/models/app-installation/webhooks.model";
import {Router} from "@angular/router";

@Component({
  selector: 'lp-config-check',
  templateUrl: './lp-config-check.component.html',
  styleUrls: ['./lp-config-check.component.scss']
})
export class LpConfigCheckComponent implements OnInit {

  @Output()
  public completed = new EventEmitter();
  public isAsyncMessagingActive:boolean;
  public currentAppInstallation:AppInstall;
  public webhooks: Webhooks;

  constructor(private accountConfigService:AccountConfigService, private  installationService: InstallationService) { }

  ngOnInit() {
    this.currentAppInstallation = this.installationService.selectedApp;
    //this.isAsyncMessagingActive = this.accountConfigService.isAsyncMessagingActive;

    this.installationService.istallationSubject.subscribe( event => {
      if( event === 'APP_SELECTED'){
        this.currentAppInstallation = this.installationService.selectedApp;
        this.initWebhooks();
      }
    });

    this.accountConfigService.acSubject.subscribe( event => {
      if( event === 'GET_LIST'){
        this.isAsyncMessagingActive = this.accountConfigService.isAsyncMessagingActive;
      }
    });

    this.initWebhooks();
  }

  private initWebhooks() {
    this.webhooks = new Webhooks();
    this.webhooks.initEndpoints();
    if(this.installationService.selectedApp && this.installationService.selectedApp.capabilities &&  this.installationService.selectedApp.capabilities.webhooks) {
      this.webhooks.deserialize(this.installationService.selectedApp.capabilities.webhooks);
    }
  }



}
