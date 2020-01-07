import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {AppInstall} from '../../../shared/models/app-installation/appInstall.model';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Webhooks} from '../../../shared/models/app-installation/webhooks.model';
import {Capabilities} from '../../../shared/models/app-installation/capabilities.model';

@Component({
  selector: 'lp-edit-app-installation',
  templateUrl: './lp-edit-app-installation.component.html',
  styleUrls: ['./lp-edit-app-installation.component.sass']
})
export class LpEditAppInstallationComponent implements OnInit, AfterViewInit {
  
  @Input() appInstall: AppInstall;
  public form: FormGroup;
  public retention_time: number;
  public enabled: boolean;
  
  public engagementFormValue = {};
  
  constructor(private formBuilder: FormBuilder) {
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
    this.enabled = this.appInstall.enabled;
    
    this.form = new FormGroup({
      appName: new FormControl(''),
      description: new FormControl(''),
      engagementInfo: new FormControl('')
    });
    
    this.form.patchValue({
      appName: this.appInstall.client_name,
      description: this.appInstall.description
    });
    
    if (this.appInstall.capabilities && this.appInstall.capabilities.webhooks && this.appInstall.capabilities.webhooks.retry) {
      this.retention_time = this.appInstall.capabilities.webhooks.retry.retention_time;
    }
    
    if (!this.appInstall.capabilities) {
      this.appInstall.capabilities = new Capabilities();
    }
    
    let whs = new Webhooks();
    whs.initEndpoints();
    
    this.appInstall.capabilities.webhooks = Object.assign(whs, this.appInstall.capabilities.webhooks);
    
    if (this.appInstall.capabilities.engagement) {
      this.engagementFormValue = {
        designEngagement: this.appInstall.capabilities.engagement.design_engagement,
        designWindow: this.appInstall.capabilities.engagement.design_window,
        languageSelection: this.appInstall.capabilities.engagement.language_selection,
        entryPoints: this.appInstall.capabilities.engagement.entry_point,
        visitorBehavior: this.appInstall.capabilities.engagement.visitor_behavior,
        targetAudience: this.appInstall.capabilities.engagement.target_audience,
        goals: this.appInstall.capabilities.engagement.goal,
        consumerIdentity: this.appInstall.capabilities.engagement.consumer_identity
      };
    } else {
      this.setDefaultEngagementFormValues();
    }
  }
  
  ngAfterViewInit() {
    if (this.appInstall.capabilities.engagement) {
      console.log('RNGA');
      this.form.controls['engagementInfo'].setValue(this.engagementFormValue);
    }
  }
  
  
  updateEditableApplicationFields() {
    this.appInstall.client_name = this.form.controls['appName'].value;
    this.appInstall.description = this.form.controls['description'].value;
    this.appInstall.enabled = this.enabled;
    if (this.retention_time) {
      this.appInstall.capabilities.webhooks.retry.retention_time = this.retention_time;
    } else {
      delete this.appInstall.capabilities.webhooks.retry;
    }
    if (this.appInstall.capabilities.engagement) {
      this.appInstall.capabilities.engagement.design_engagement = this.form.controls['engagementInfo'].value.designEngagement;
      this.appInstall.capabilities.engagement.design_window = this.form.controls['engagementInfo'].value.designWindow;
      this.appInstall.capabilities.engagement.language_selection = this.form.controls['engagementInfo'].value.languageSelection;
      this.appInstall.capabilities.engagement.entry_point = this.form.controls['engagementInfo'].value.entryPoints;
      this.appInstall.capabilities.engagement.visitor_behavior = this.form.controls['engagementInfo'].value.visitorBehavior;
      this.appInstall.capabilities.engagement.target_audience = this.form.controls['engagementInfo'].value.targetAudience;
      this.appInstall.capabilities.engagement.goal = this.form.controls['engagementInfo'].value.goals;
      this.appInstall.capabilities.engagement.consumer_identity = this.form.controls['engagementInfo'].value.consumerIdentity;
    }
    this.cleanEmptyEndpoints();
  }
  
  cleanEmptyEndpoints() {
    if (this.appInstall.capabilities.webhooks) {
      Object.keys(this.appInstall.capabilities.webhooks).forEach(key => {
        if (key !== 'retry' && !this.appInstall.capabilities.webhooks[key].endpoint) {
          delete this.appInstall.capabilities.webhooks[key];
        } else if (key === 'retry' && this.appInstall.capabilities.webhooks[key].retention_time === 0) {
          delete this.appInstall.capabilities.webhooks['retry'];
        }
      });
    }
  }
  
  private setDefaultEngagementFormValues() {
    const defaultEntryPoints = [];
    const defaultVisitorBehavior = [];
    const defaultTargetAudience = [];
    const defaultGoals = [];
    const defaultConsumerIdentity = [];
    
    this.engagementFormValue = {
      designEngagement: false,
      designWindow: false,
      languageSelection: false,
      entryPoints: defaultEntryPoints,
      visitorBehavior: defaultVisitorBehavior,
      targetAudience: defaultTargetAudience,
      goals: defaultGoals,
      consumerIdentity: defaultConsumerIdentity
    };
    
  }
}



