import {Component, EventEmitter, OnChanges, OnInit, Output} from '@angular/core';
import {InstallationService} from "../../core/services/istallation.service";
import {hasOwnProperty} from "tslint/lib/utils";
import {Webhooks} from "../../shared/models/app-installation/webhooks.model";

@Component({
  selector: 'lp-webhooks-config',
  templateUrl: './webhooks-config.component.html',
  styleUrls: ['./webhooks-config.component.scss']
})
export class WebhooksConfigComponent implements OnInit {


  @Output()
  public completed = new EventEmitter();
  public webhooks: Webhooks;

  constructor(private installationService:InstallationService) { }

  ngOnInit() {
    this.webhooks = new Webhooks();
    this.webhooks.initEndpoints();
    this.installationService.istallationSubject.subscribe( event => {
      if(event === 'APP_SELECTED') {
        if(this.installationService.selectedApp.capabilities &&  this.installationService.selectedApp.capabilities.webhooks){
          this.webhooks.deserialize(this.installationService.selectedApp.capabilities.webhooks);
        }
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
    }*/

    console.log(this.installationService.selectedApp);
    if(this.installationService.selectedApp.capabilities &&  this.installationService.selectedApp.capabilities.webhooks){
      this.installationService.selectedApp.capabilities.webhooks.deserialize(this.webhooks);
      this.installationService.updateApp(this.installationService.selectedApp);
    }
    this.completed.emit(true);

  }

}
