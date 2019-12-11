import { Component, OnInit, Input } from '@angular/core';
import {AppInstall} from "../../../shared/models/app-installation/appInstall.model";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Webhooks} from "../../../shared/models/app-installation/webhooks.model";
import {Capabilities} from "../../../shared/models/app-installation/capabilities.model";

@Component({
  selector: 'lp-edit-app-installation',
  templateUrl: './lp-edit-app-installation.component.html',
  styleUrls: ['./lp-edit-app-installation.component.sass']
})
export class LpEditAppInstallationComponent implements OnInit {
  
  @Input() appInstall: AppInstall;
  public form: FormGroup;
  public retention_time: number;
  public enabled: boolean;
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
    this.enabled = this.appInstall.enabled;
  
    this.form = new FormGroup({
      appName: new FormControl(''),
      description: new FormControl(''),
    },);
    
    this.form.patchValue({
      appName: this.appInstall.client_name,
      description: this.appInstall.description
    });
    
    if(this.appInstall.capabilities && this.appInstall.capabilities.webhooks && this.appInstall.capabilities.webhooks.retry) {
      this.retention_time = this.appInstall.capabilities.webhooks.retry.retention_time;
    }
    
    if(!this.appInstall.capabilities) {
      this.appInstall.capabilities = new Capabilities();
    }
  
    let whs = new Webhooks();
    whs.initEndpoints();
    
    this.appInstall.capabilities.webhooks = Object.assign( whs, this.appInstall.capabilities.webhooks);
    
  }
  
  public updateEditableApplicationFields(){
    this.appInstall.client_name = this.form.controls['appName'].value;
    this.appInstall.description = this.form.controls['description'].value;
    this.appInstall.enabled = this.enabled;
    if(this.retention_time){
      this.appInstall.capabilities.webhooks.retry.retention_time = this.retention_time;
    } else {
      delete this.appInstall.capabilities.webhooks.retry;
    }
    this.cleanEmptyEndpoints();
  }
  
  private cleanEmptyEndpoints(){
    if(this.appInstall.capabilities.webhooks){
      Object.keys(this.appInstall.capabilities.webhooks).forEach(key => {
        if(key !=='retry' && !this.appInstall.capabilities.webhooks[key].endpoint ){
          delete this.appInstall.capabilities.webhooks[key];
        }
      });
    }
  }
}



