import { Component, OnInit } from '@angular/core';
import {InstallationService} from "../../core/services/istallation.service";
import {FormControl, Validators} from '@angular/forms';
import {AppInstall} from "../../shared/models/app-installation/appInstall.model";
import {Webhooks} from "../../shared/models/app-installation/webhooks.model";
import {Capabilities} from "../../shared/models/app-installation/capabilities.model";
import {Endpoint} from "../../shared/models/app-installation/endpoint.model";

@Component({
  selector: 'lp-app-key-secret',
  templateUrl: './app-key-secret.component.html',
  styleUrls: ['./app-key-secret.component.scss']
})
export class AppKeySecretComponent implements OnInit {
  public selectControl = new FormControl('', [Validators.required]);
  public selectedApp: AppInstall;
  public appList = [];

  constructor(private installationService:InstallationService) { }

  ngOnInit() {
    this.installationService.getAppListList();

    this.installationService.istallationSubject.subscribe( event => {
      if(event === 'GET_APP_LIST'){
        this.appList = this.installationService.appList;
        console.log(this.installationService.appList);
      }
    });
  }

  public next(){

    this.installationService.selectedApp = this.addWebhooksObject(this.selectedApp);

    console.log(this.selectedApp);
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
