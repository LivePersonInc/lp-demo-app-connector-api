import { Component, OnInit, Input } from '@angular/core';
import {AppInstall} from "../../../shared/models/app-installation/appInstall.model";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

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
    this.form = new FormGroup({
      appName: new FormControl(''),
      description: new FormControl(''),
    },);
    
    this.form.patchValue({
      appName: this.appInstall.client_name,
      description: this.appInstall.description
    });
    
    //this.appInstall.client_id
    this.retention_time = this.appInstall.capabilities.webhooks.retry.retention_time;
    this.enabled = this.appInstall.enabled;
  
  }

}
