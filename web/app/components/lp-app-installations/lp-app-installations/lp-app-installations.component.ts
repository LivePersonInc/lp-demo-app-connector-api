import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Component, OnInit} from '@angular/core';
import {AppInstall} from "../../../shared/models/app-installation/appInstall.model";
import {Webhooks} from "../../../shared/models/app-installation/webhooks.model";
import {Capabilities} from "../../../shared/models/app-installation/capabilities.model";
import {environment} from "../../../../environments/environment.prod";

@Component({
  selector: 'lp-app-installations',
  templateUrl: './lp-app-installations.component.html',
  styleUrls: ['./lp-app-installations.component.scss']
})
export class LpAppInstallationsComponent implements OnInit {
  public webhooks: Webhooks;
  public form: FormGroup;
  public isDemoChecked:boolean;
  public ttlValue:number;
  public server = environment.server;
  public currentURL = "https://" + this.server + "/notifications/event";
  private pattern = "^https\\:\\/\\/[0-9a-zA-Z]([-.\\w]*[0-9a-zA-Z])*(:(0-9)*)*(\\/?)([a-zA-Z0-9\\-\\.\\?\\,\\:\\'\\/\\\\+=&;%\\$#_]*)?$";
  
  constructor(private formBuilder: FormBuilder) {}
 
  public ttls = [
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
    },);
    
    this.ttlValue = 3600;
    this.onValueChanges();
  
    this.initWebhooks();
  }

  onValueChanges(): void {
    this.form.get('endpoint').valueChanges.subscribe(val=>{
      console.log(val);
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
    if(this.isDemoChecked){
      this.form.patchValue({
        endpoint: this.currentURL
      });
    } else {
      this.form.patchValue({
        endpoint: ""
      });
    }
  }
  
  public createAppInstallation(): AppInstall {
    const appInstall = new AppInstall();
    const capabilities = new Capabilities();
    let webhooks = new Webhooks();
    webhooks.initEndpoints();
    if(this.isDemoChecked){
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
    appInstall.grant_types = ["client_credentials"];
    appInstall.scope = 'msg.consumer';
    appInstall.logo_uri = '';
    appInstall.capabilities = capabilities;
  
    this.cleanEmptyEndpoints(appInstall);
    
    return appInstall
  }
  
  private cleanEmptyEndpoints(appInstall: AppInstall){
    if(appInstall.capabilities.webhooks){
      Object.keys(appInstall.capabilities.webhooks).forEach(key => {
        if(key !=='retry' && !appInstall.capabilities.webhooks[key].endpoint ){
          delete appInstall.capabilities.webhooks[key];
        }
      });
    }
  }
  
}
