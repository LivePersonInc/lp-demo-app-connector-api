import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {AppInstall} from '../../../shared/models/app-installation/appInstall.model';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Webhooks} from '../../../shared/models/app-installation/webhooks.model';
import {Capabilities} from '../../../shared/models/app-installation/capabilities.model';
import {Engagement} from '../../../shared/models/app-installation/engagement.model';

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
  public whValid: boolean;
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
    
    const engagement = this.form.controls['engagementInfo'].value;
    
    if (!this.appInstall.capabilities.engagement) {
      this.appInstall.capabilities.engagement = new Engagement();
    }
    this.appInstall.capabilities.engagement.design_engagement = engagement.designEngagement;
    this.appInstall.capabilities.engagement.design_window = engagement.designWindow;
    this.appInstall.capabilities.engagement.language_selection = engagement.languageSelection;
    this.appInstall.capabilities.engagement.entry_point = engagement.entryPoints;
    this.appInstall.capabilities.engagement.visitor_behavior = engagement.visitorBehavior;
    this.appInstall.capabilities.engagement.target_audience = engagement.targetAudience;
    this.appInstall.capabilities.engagement.goal = engagement.goals;
    this.appInstall.capabilities.engagement.consumer_identity = engagement.consumerIdentity;
    
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
  
  onWhChange(event: Webhooks) {
    this.whValid = true;
    const pattern = RegExp('^https\\:\\/\\/[0-9a-zA-Z]([-.\\w]*[0-9a-zA-Z])*(:(0-9)*)*(\\/?)([a-zA-Z0-9\\-\\.\\?\\,\\:\\\'\\/\\\\+=&;%\\$#_]*)?$');
    // Validate webhooks in order to have the value in parent component
    Object.keys(event).forEach(key => {
      if (key !== 'retry' && event[key].endpoint) {
        if (!pattern.test(event[key].endpoint)) {
          this.whValid = false;
        }
      }
    });
  }
  
  private setDefaultEngagementFormValues() {
    const defaultEntryPoints = ['url', 'section'];
    const defaultVisitorBehavior = [
      'visited_location',
      'time_on_location',
      'flow',
      'engaged_in_session',
      'about_to_abandon',
      'cart_value',
      'cart_items',
      'visitor_error',
      'viewed_products',
      'service_activity'];
    const defaultTargetAudience = [
      'external_referral',
      'search_keywords',
      'ip',
      'platform',
      'geo_location',
      'returning_visitors',
      'marketing_source',
      'customer_type',
      'age',
      'balance',
      'customer_id',
      'gender',
      'store_zip_code',
      'store_number',
      'company_size',
      'registration_date'
    ];
    const defaultGoals = ['url', 'purchase_total', 'num_of_pages', 'lead', 'service_activity'];
    const defaultConsumerIdentity = ['auth'];
    
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



