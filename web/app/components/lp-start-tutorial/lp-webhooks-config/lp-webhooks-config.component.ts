import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {InstallationService} from '../../../core/services/istallation.service';
import {Webhooks} from '../../../shared/models/app-installation/webhooks.model';
import {Capabilities} from '../../../shared/models/app-installation/capabilities.model';
import {ISubscription} from "rxjs/Subscription";
import {environment} from "../../../../environments/environment.prod";
import {Endpoint} from "../../../shared/models/app-installation/endpoint.model";

@Component({
  selector: 'lp-webhooks-config',
  templateUrl: './lp-webhooks-config.component.html',
  styleUrls: ['./lp-webhooks-config.component.scss']
})
export class LpWebhooksConfigComponent implements OnInit, OnDestroy {

  @Output()
  public completed = new EventEmitter();
  public webhooks: Webhooks;
  public installationService: InstallationService;
  public server = environment.server;
  public currentURL = "https://" + this.server + "/notifications/event"
  private installationSubscription: ISubscription;

  constructor(private _installationService: InstallationService) {
    this.installationService = _installationService;
  }

  ngOnInit() {
    this.installationSubscription = this.installationService.installationSubject.subscribe(event => {
      switch (event) {
        case 'APP_SELECTED': {
          this.webhooks = new Webhooks();
          this.webhooks.initEndpoints();
          if (this.installationService.selectedApp.capabilities && this.installationService.selectedApp.capabilities.webhooks) {
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

  ngOnDestroy() {
    if(this.installationSubscription) this.installationSubscription.unsubscribe();
  }

  addCurrentURLtoendpoints(){
    this.webhooks['ms.MessagingEventNotification.ContentEvent'].endpoint = this.currentURL;
    this.webhooks['ms.MessagingEventNotification.ContentEvent'].endpoint = this.currentURL;
    this.webhooks['ms.MessagingEventNotification.RichContentEvent'].endpoint = this.currentURL;
    this.webhooks['ms.MessagingEventNotification.AcceptStatusEvent'].endpoint = this.currentURL;
    this.webhooks['ms.MessagingEventNotification.ChatStateEvent'].endpoint = this.currentURL;
    this.webhooks['cqm.ExConversationChangeNotification'].endpoint = this.currentURL;
  }

  public updateWebhooks() {
    if (this.installationService.selectedApp.capabilities && this.installationService.selectedApp.capabilities.webhooks) {
      this.installationService.selectedApp.capabilities.webhooks = new Webhooks();
      this.installationService.selectedApp.capabilities.webhooks.deserialize(this.webhooks.serialize());
    } else if (!this.installationService.selectedApp.capabilities) {
      this.installationService.selectedApp.capabilities = new Capabilities();
      this.installationService.selectedApp.capabilities.webhooks.deserialize(this.webhooks.serialize());
    } else if (this.installationService.selectedApp.capabilities && !this.installationService.selectedApp.capabilities.webhooks) {
      this.installationService.selectedApp.capabilities.webhooks = new Webhooks();
      this.installationService.selectedApp.capabilities.webhooks.deserialize(this.webhooks.serialize());
    }
    this.installationService.updateApp(this.installationService.selectedApp);
  }

}
