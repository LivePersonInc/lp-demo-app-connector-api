import {Component, EventEmitter, OnChanges, OnInit, Output} from '@angular/core';
import {InstallationService} from "../../core/services/istallation.service";
import {hasOwnProperty} from "tslint/lib/utils";
import {Webhooks} from "../../shared/models/app-installation/webhooks.model";
import {Capabilities} from "../../shared/models/app-installation/capabilities.model";

@Component({
  selector: 'lp-webhooks-config',
  templateUrl: './lp-webhooks-config.component.html',
  styleUrls: ['./lp-webhooks-config.component.scss']
})
export class WebhooksConfigComponent implements OnInit {
  @Output()
  public completed = new EventEmitter();
  public webhooks: Webhooks;
  public installationService:InstallationService;

  constructor(private _installationService:InstallationService) {
    this.installationService = _installationService;
  }

  ngOnInit() {
    this.installationService.istallationSubject.subscribe(event => {
      switch (event) {
        case 'APP_SELECTED': {
          this.webhooks = new Webhooks();
          this.webhooks.initEndpoints();
          if(this.installationService.selectedApp.capabilities &&  this.installationService.selectedApp.capabilities.webhooks) {
            this.webhooks.deserialize(this.installationService.selectedApp.capabilities.webhooks);
          }
          break;
        }
        case 'UPDATE_APP': {
          //
          break;
        }
      }
    });
  }

  public updateWebhooks() {
    if(this.installationService.selectedApp.capabilities &&  this.installationService.selectedApp.capabilities.webhooks) {
      this.installationService.selectedApp.capabilities.webhooks.deserialize(this.webhooks.serialize());
    }else if(!this.installationService.selectedApp.capabilities) {
      this.installationService.selectedApp.capabilities = new Capabilities();
      this.installationService.selectedApp.capabilities.webhooks.deserialize(this.webhooks.serialize());
    }else if(this.installationService.selectedApp.capabilities && !this.installationService.selectedApp.capabilities.webhooks) {

    }

    this.installationService.updateApp(this.installationService.selectedApp);

  }

}
