import {Component, OnChanges, OnInit} from '@angular/core';
import {InstallationService} from "../../core/services/istallation.service";
import {hasOwnProperty} from "tslint/lib/utils";
import {Webhooks} from "../../shared/models/app-installation/webhooks.model";

@Component({
  selector: 'lp-webhooks-config',
  templateUrl: './webhooks-config.component.html',
  styleUrls: ['./webhooks-config.component.scss']
})
export class WebhooksConfigComponent implements OnInit {

  public webhooks: Webhooks;

  constructor(private installationService:InstallationService) { }

  ngOnInit() {
    this.installationService.istallationSubject.subscribe( event => {
      if(event === 'APP_SELECTED') {
        this.webhooks = this.installationService.selectedApp.capabilities.webhooks;
        console.log("SFSFSG");
        console.log(this.webhooks);
      }
    });
  }

  public updateWebhooks() {
    /*
    console.log("UPDATE");
    for(let prop in this.installationService.selectedApp.capabilities.webhooks){
      if(this.installationService.selectedApp.capabilities.webhooks[prop].endpoint.length === 0){
        delete  this.installationService.selectedApp.capabilities.webhooks[prop];
      }
    }
    console.log(this.installationService.selectedApp);
    this.installationService.updateApp(this.installationService.selectedApp);
    */
  }

}
