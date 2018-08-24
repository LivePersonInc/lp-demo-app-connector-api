import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {InstallationService} from '../../../core/services/istallation.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Webhooks} from '../../../shared/models/app-installation/webhooks.model';
import {Capabilities} from '../../../shared/models/app-installation/capabilities.model';
import {FormControl, Validators} from '@angular/forms';
import {ISubscription} from "rxjs/Subscription";

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
  public webhooksForm: FormGroup;

  private installationSubscription: ISubscription;
  private pattern = "^https\\:\\/\\/[0-9a-zA-Z]([-.\\w]*[0-9a-zA-Z])*(:(0-9)*)*(\\/?)([a-zA-Z0-9\\-\\.\\?\\,\\:\\'\\/\\\\+=&;%\\$#_]*)?$";

  constructor(private _installationService: InstallationService, private fb: FormBuilder) {
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

    this.webhooksForm = this.fb.group({
      'AcceptStatusEvent': new FormControl('', [Validators.pattern(this.pattern),]),
      'ChatStateEvent': new FormControl('', [Validators.pattern(this.pattern),]),
      'ContentEvent': new FormControl('', [Validators.pattern(this.pattern),]),
      'RichContentEvent': new FormControl('', [Validators.pattern(this.pattern),]),
      'ExConversationChangeNotification': new FormControl('', [Validators.pattern(this.pattern),])
    });
  }

  ngOnDestroy() {
    if(this.installationSubscription) this.installationSubscription.unsubscribe();
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
