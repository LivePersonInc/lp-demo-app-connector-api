import {Component, OnChanges, OnInit} from '@angular/core';
import {InstallationService} from "../../core/services/istallation.service";
import {hasOwnProperty} from "tslint/lib/utils";

@Component({
  selector: 'lp-webhooks-config',
  templateUrl: './webhooks-config.component.html',
  styleUrls: ['./webhooks-config.component.scss']
})
export class WebhooksConfigComponent implements OnInit {

  constructor(private installationService:InstallationService) { }

  ngOnInit() {
  }

  public updateWebhooks() {
    console.log("UPDATE");
    for(let prop in this.installationService.selectedApp.capabilities.webhooks){
      if(this.installationService.selectedApp.capabilities.webhooks[prop].endpoint.length === 0){
        delete  this.installationService.selectedApp.capabilities.webhooks[prop];
      }
    }
    console.log(this.installationService.selectedApp);
    this.installationService.updateApp(this.installationService.selectedApp);
  }

}
