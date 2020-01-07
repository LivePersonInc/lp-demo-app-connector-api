import {Component, forwardRef, Input, OnInit, ViewChild} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator
} from '@angular/forms';
import {MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

@Component({
  selector: 'lp-engagement-form',
  templateUrl: './lp-engagement-form.component.html',
  styleUrls: ['./lp-engagement-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LpEngagementFormComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => LpEngagementFormComponent),
      multi: true
    }
  ]
})

export class LpEngagementFormComponent implements OnInit, ControlValueAccessor, Validator {
  public engagementForm: FormGroup;
  public defaultEntryPoints = [];
  public defaultVisitorBehavior = [];
  public defaultTargetAudience = [];
  public defaultGoals = [];
  public defaultConsumerIdentity = [];
  
  public availableEntryPoints = ['url', 'section'];
  public filteredEntryPoints = [];
  public availableVisitorBehavior = ['visited_location', 'time_on_location', 'flow', 'engaged_in_session', 'about_to_abandon', 'cart_value', 'cart_items', 'visitor_error', 'viewed_products', 'service_activity'];
  public filteredVisitorBehavior = [];
  public availableTargetAudience = ['external_referral', 'search_keywords', 'ip', 'platform', 'geo_location', 'returning_visitors', 'marketing_source', 'customer_type', 'age', 'balance', 'customer_id', 'gender', 'store_zip_code', 'store_number', 'company_size', 'registration_date'];
  public filteredTargetAudience = [];
  public availableGoals = ['url', 'purchase_total', 'num_of_pages', 'lead', 'service_activity'];
  public filteredGoals = [];
  public availableConsumerIdentity = ['auth'];
  
  @ViewChild('entryPointChipList', {static: true}) entryPointChipList;
  @ViewChild('visitorBehaviorChipList', {static: true}) visitorBehaviorChipList;
  @ViewChild('targetAudienceChipList', {static: true}) targetAudienceChipList;
  @ViewChild('goalsChipList', {static: true}) goalsChipList;
  @ViewChild('consumerIdentityChipList', {static: true}) consumerIdentityChipList;
  
  // chip input props.
  public selectable = true;
  public removable = true;
  public addOnBlur = true;
  public readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  
  @Input('value')
  set value(val: any) {
    this.defaultVisitorBehavior = val.visitorBehavior;
    this.defaultEntryPoints = val.entryPoints;
    this.defaultConsumerIdentity = val.consumerIdentity;
    this.defaultGoals = val.goals;
    this.defaultTargetAudience = val.targetAudience;
  }
  
  constructor(private fb: FormBuilder) {
  }
  
  ngOnInit() {
    /* HINT: Validation is base on App Installation SCHEMA: https://lpgithub.dev.lprnd.net/le-infra/Account-Config-Service/
blob/master/ac-common-service-contracts/src/main/resources/installations/schema.json*/
    this.engagementForm = new FormGroup({
      designEngagement: new FormControl(false),
      designWindow: new FormControl(false),
      languageSelection: new FormControl(false),
      entryPoints: this.fb.array(this.defaultEntryPoints, [this.validateRequired, this.validateMax10, this.validateUniqueItems]),
      visitorBehavior: this.fb.array(this.defaultVisitorBehavior, [this.validateMax10, this.validateUniqueItems]),
      targetAudience: this.fb.array(this.defaultTargetAudience, [this.validateMax20, this.validateUniqueItems]),
      goals: this.fb.array(this.defaultGoals, [this.validateMax10, this.validateUniqueItems]),
      consumerIdentity: this.fb.array(this.defaultConsumerIdentity, [this.validateRequired, this.validateMax5, this.validateUniqueItems])
    });
    
    this.engagementForm.get('entryPoints').statusChanges.subscribe(
      status => this.entryPointChipList.errorState = status === 'INVALID'
    );
    this.engagementForm.get('visitorBehavior').statusChanges.subscribe(
      status => this.visitorBehaviorChipList.errorState = status === 'INVALID'
    );
    this.engagementForm.get('targetAudience').statusChanges.subscribe(
      status => this.targetAudienceChipList.errorState = status === 'INVALID'
    );
    this.engagementForm.get('goals').statusChanges.subscribe(
      status => this.goalsChipList.errorState = status === 'INVALID'
    );
    this.engagementForm.get('consumerIdentity').statusChanges.subscribe(
      status => this.consumerIdentityChipList.errorState = status === 'INVALID'
    );
    
  }
  
  /*** Control Value Accessor  and Validator Implemented Methods ***/
  writeValue(val: any): void {
    if (val) {
      this.engagementForm.setValue(val);
    }
  }
  
  registerOnChange(fn: any): void {
    this.engagementForm.valueChanges.subscribe(fn);
  }
  
  
  registerOnTouched(fn): void {
    
    this.engagementForm.valueChanges.subscribe(fn);
  }
  
  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.engagementForm.disable() : this.engagementForm.enable();
  }
  
  validate(c: AbstractControl): ValidationErrors | null {
    return this.engagementForm.valid ? null : {invalidForm: {valid: false, message: 'invalid engagement'}};
  }
  
  /*******/
  
  /*** Mat chips form methord **/
  addChipElement(event: MatChipInputEvent, formControlName: string) {
    const input = event.input;
    const value = event.value;
    
    if ((value || '').trim()) {
      const chipsElements = this.engagementForm.get(formControlName) as FormArray;
      chipsElements.push(this.fb.control(value.trim()));
    }
    
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }
  
  removeChipElement(index: number, formControlName: string) {
    const chipsElements = this.engagementForm.get(formControlName) as FormArray;
    if (index >= 0) {
      chipsElements.removeAt(index);
    }
  }
  
  /******/
  
  // Form Controls
  validateRequired(c: FormControl) {
    if (c.value.length === 0) {
      return {required: true};
    } else {
      return null;
    }
  }
  
  validateMax10(c: FormControl) {
    if (c.value.length > 10) {
      return {max10: true};
    } else {
      return null;
    }
  }
  
  validateMax5(c: FormControl) {
    if (c.value.length > 5) {
      return {max5: true};
    } else {
      return null;
    }
  }
  
  validateMax20(c: FormControl) {
    if (c.value.length > 20) {
      return {max20: true};
    } else {
      return null;
    }
  }
  
  validateUniqueItems(c: FormControl) {
    if (c.value.length > 1 && (new Set(c.value)).size !== c.value.length) {
      return {unique: true};
    }
    return null;
  }
  
}
