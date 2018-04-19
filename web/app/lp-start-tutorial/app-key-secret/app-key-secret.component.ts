import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {InstallationService} from "../../core/services/istallation.service";
import {FormControl, Validators} from '@angular/forms';
import {AppInstall} from "../../shared/models/app-installation/appInstall.model";
import {Webhooks} from "../../shared/models/app-installation/webhooks.model";
import {Capabilities} from "../../shared/models/app-installation/capabilities.model";
import {Endpoint} from "../../shared/models/app-installation/endpoint.model";
import {MatSelectChange} from "@angular/material";

@Component({
  selector: 'lp-app-key-secret',
  templateUrl: './app-key-secret.component.html',
  styleUrls: ['./app-key-secret.component.scss']
})
export class AppKeySecretComponent implements OnInit {

  @Output()
  public completed = new EventEmitter();
  public isCompleted: boolean;
  public selectedApp: AppInstall;
  public appList = [];

  constructor(private installationService:InstallationService) { }

  ngOnInit() {
    this.installationService.istallationSubject.subscribe( event => {
      if(event === 'GET_APP_LIST'){
        this.appList = this.installationService.appList;
        console.log(this.installationService.appList);
      }
    });
  }

  public next(){
    if(this.selectedApp){
      this.installationService.selectedApp = this.addWebhooksObject(this.selectedApp);
      this.isCompleted = true;
    }
  }

  public onSelectionChange(event: MatSelectChange) {
    console.log(event.value);
    if(event.value instanceof AppInstall){
      this.completed.emit(true);

    }else{
      console.log("XXXXX");
      this.completed.emit(false);
    }
  }

  private hasWebhooksProp(app: AppInstall): boolean {
    if(app.capabilities && app.capabilities.webhooks){
      return true;
    }
    return false;
  }
  private addWebhooksObject(app: AppInstall): AppInstall {
    if(!this.hasWebhooksProp(app)) {
       if(app.capabilities){
         app.capabilities.webhooks = new Webhooks();
       }else{
         app.capabilities = new Capabilities();
         app.capabilities.webhooks = new Webhooks();
         app.capabilities.webhooks['ms.MessagingEventNotification.AcceptStatusEvent'] = new Endpoint();
         app.capabilities.webhooks['cqm.ExConversationChangeNotification'] = new Endpoint();
         app.capabilities.webhooks['ms.MessagingEventNotification.ChatStateEvent'] = new Endpoint();
         app.capabilities.webhooks['ms.MessagingEventNotification.ContentEvent'] = new Endpoint();
         app.capabilities.webhooks['ms.MessagingEventNotification.RichContentEvent'] = new Endpoint();
       }
    }else {
      if(!app.capabilities.webhooks['ms.MessagingEventNotification.AcceptStatusEvent']) {
        app.capabilities.webhooks['ms.MessagingEventNotification.AcceptStatusEvent'] = new Endpoint();
      }
      if(!app.capabilities.webhooks['cqm.ExConversationChangeNotification']) {
        app.capabilities.webhooks['cqm.ExConversationChangeNotification'] = new Endpoint();
      }
      if(!app.capabilities.webhooks['ms.MessagingEventNotification.ChatStateEvent']) {
        app.capabilities.webhooks['ms.MessagingEventNotification.ChatStateEvent'] = new Endpoint();
      }

      if(!app.capabilities.webhooks['ms.MessagingEventNotification.ContentEvent']) {
        app.capabilities.webhooks['ms.MessagingEventNotification.ContentEvent'] = new Endpoint();
      }
      if(!app.capabilities.webhooks['ms.MessagingEventNotification.RichContentEvent']) {
        app.capabilities.webhooks['ms.MessagingEventNotification.RichContentEvent'] = new Endpoint();
      }

    }
    return app;
  }

}
