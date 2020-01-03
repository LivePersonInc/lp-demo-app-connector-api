import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Component, OnInit} from '@angular/core';
import {AppInstall} from '../../../shared/models/app-installation/appInstall.model';
import {Webhooks} from '../../../shared/models/app-installation/webhooks.model';
import {Capabilities} from '../../../shared/models/app-installation/capabilities.model';
import {environment} from '../../../../environments/environment.prod';
import {Engagement} from '../../../shared/models/app-installation/engagement.model';

@Component({
  selector: 'lp-app-installations',
  templateUrl: './lp-app-installations.component.html',
  styleUrls: ['./lp-app-installations.component.scss']
})
export class LpAppInstallationsComponent implements OnInit {
  public webhooks: Webhooks;
  public form: FormGroup;
  public isDemoChecked: boolean;
  public ttlValue: number;
  public server = environment.server;
  public currentURL = 'https://' + this.server + '/notifications/event';
  private pattern = '^https\\:\\/\\/[0-9a-zA-Z]([-.\\w]*[0-9a-zA-Z])*(:(0-9)*)*(\\/?)([a-zA-Z0-9\\-\\.\\?\\,\\:\\\'\\/\\\\+=&;%\\$#_]*)?$';
  
  constructor() {
  }
  
  public ttls = [
    {value: 0, viewValue: 'NONE'},
    {value: 3600, viewValue: '1 hour'},
    {value: 9200, viewValue: '2 hours'},
    {value: 14400, viewValue: '4 hours'},
    {value: 21600, viewValue: '6 hours'},
    {value: 24200, viewValue: '12 hours'},
    {value: 86400, viewValue: '24 hours'},
    {value: 172800, viewValue: '48 hours'},
    {value: 259200, viewValue: '72 hours'}
  ];
  
  ngOnInit() {
    this.form = new FormGroup({
      appName: new FormControl(''),
      description: new FormControl(''),
      endpoint: new FormControl('', [Validators.pattern(this.pattern)]),
      engagementInfo: new FormControl('')
    });
    
    this.ttlValue = 0;
    this.onValueChanges();
    
    this.initWebhooks();
  }
  
  onValueChanges(): void {
    this.form.get('endpoint').valueChanges.subscribe(val => {
      this.webhooks['ms.MessagingEventNotification.ContentEvent'].endpoint = this.form.controls['endpoint'].value;
      this.webhooks['ms.MessagingEventNotification.RichContentEvent'].endpoint = this.form.controls['endpoint'].value;
      this.webhooks['ms.MessagingEventNotification.AcceptStatusEvent'].endpoint = this.form.controls['endpoint'].value;
      this.webhooks['ms.MessagingEventNotification.ChatStateEvent'].endpoint = this.form.controls['endpoint'].value;
      this.webhooks['cqm.ExConversationChangeNotification'].endpoint = this.form.controls['endpoint'].value;
    });
  }
  
  
  private initWebhooks() {
    this.webhooks = new Webhooks();
    this.webhooks.initEndpoints();
  }
  
  public toggleDemoAppServerEndpoint() {
    if (this.isDemoChecked) {
      this.form.patchValue({
        endpoint: this.currentURL
      });
    } else {
      this.form.patchValue({
        endpoint: ''
      });
    }
  }
  
  public createAppInstallation(): AppInstall {
    const appInstall = new AppInstall();
    const capabilities = new Capabilities();
    let webhooks = new Webhooks();
    webhooks.initEndpoints();
    if (this.isDemoChecked) {
      webhooks['ms.MessagingEventNotification.ContentEvent'].endpoint = this.form.controls['endpoint'].value;
      webhooks['ms.MessagingEventNotification.RichContentEvent'].endpoint = this.form.controls['endpoint'].value;
      webhooks['ms.MessagingEventNotification.AcceptStatusEvent'].endpoint = this.form.controls['endpoint'].value;
      webhooks['ms.MessagingEventNotification.ChatStateEvent'].endpoint = this.form.controls['endpoint'].value;
      webhooks['cqm.ExConversationChangeNotification'].endpoint = this.form.controls['endpoint'].value;
      appInstall.client_name = this.form.controls['appName'].value + '--Demo--';
      
    } else {
      webhooks = this.webhooks;
      appInstall.client_name = this.form.controls['appName'].value;
      
    }
    webhooks.retry.retention_time = this.ttlValue;
    // Construct capabilities
    capabilities.webhooks = webhooks;
    // Construct app installation
    appInstall.description = this.form.controls['description'].value;
    appInstall.enabled = true;
    appInstall.grant_types = ['client_credentials'];
    appInstall.scope = 'msg.consumer';
    appInstall.logo_uri = '';
    appInstall.capabilities = capabilities;
    
    // add engagement object
    const engagement = this.form.controls['engagementInfo'].value;
    console.log(engagement);
    appInstall.capabilities.engagement = new Engagement();
    appInstall.capabilities.engagement.design_engagement = engagement.designEngagement;
    appInstall.capabilities.engagement.design_window = engagement.designWindow;
    appInstall.capabilities.engagement.language_selection = engagement.languageSelection;
    appInstall.capabilities.engagement.entry_point = engagement.entryPoints;
    appInstall.capabilities.engagement.visitor_behavior = engagement.visitorBehavior;
    appInstall.capabilities.engagement.target_audience = engagement.targetAudience;
    appInstall.capabilities.engagement.goal = engagement.goals;
    appInstall.capabilities.engagement.consumer_identity = engagement.consumerIdentity;
    
    this.cleanEmptyEndpoints(appInstall);
    
    return appInstall;
  }
  
  private cleanEmptyEndpoints(appInstall: AppInstall) {
    if (appInstall.capabilities.webhooks) {
      Object.keys(appInstall.capabilities.webhooks).forEach(key => {
        if (key !== 'retry' && !appInstall.capabilities.webhooks[key].endpoint) {
          delete appInstall.capabilities.webhooks[key];
        } else if (key === 'retry' && appInstall.capabilities.webhooks[key].retention_time === 0) {
          delete appInstall.capabilities.webhooks['retry'];
        }
      });
    }
  }
  
}
