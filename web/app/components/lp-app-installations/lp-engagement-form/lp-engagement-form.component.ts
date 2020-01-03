import {Component, forwardRef, OnInit, ViewChild} from '@angular/core';
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
  public defaultEntryPoints = ['url', 'section'];
  
  @ViewChild('entryPointChipList', {static: true}) entryPointChipList;
  
  // chip input props.
  public selectable = true;
  public removable = true;
  public addOnBlur = true;
  public readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  
  constructor(private fb: FormBuilder) {
    this.engagementForm = this.fb.group({
      designEngagement: new FormControl(false),
      designWindow: new FormControl(false),
      languageSelection: new FormControl(false),
      entryPoints: this.fb.array(this.defaultEntryPoints, [this.validateRequired, this.validateMax10]),
    });
  }
  
  ngOnInit() {
    this.engagementForm.get('entryPoints').statusChanges.subscribe(
      status => this.entryPointChipList.errorState = status === 'INVALID'
    );
    
  }
  
  writeValue(val: any): void {
    if (val) {
      this.engagementForm.setValue(val, {emitEvent: false});
    }
  }
  
  registerOnChange(fn: any): void {
    this.engagementForm.valueChanges.subscribe(fn);
  }
  
  registerOnTouched(fn: any): void {
    // Don't care about touched form in this case.
  }
  
  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.engagementForm.disable() : this.engagementForm.enable();
  }
  
  validate(c: AbstractControl): ValidationErrors | null {
    return this.engagementForm.valid ? null : {invalidForm: {valid: false, message: 'invalid engament'}};
  }
  
  addEntryPoint(event: MatChipInputEvent) {
    const input = event.input;
    const value = event.value;
    
    // Add our requirement
    if ((value || '').trim()) {
      const entryPoints = this.engagementForm.get('entryPoints') as FormArray;
      entryPoints.push(this.fb.control(value.trim()));
    }
    
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }
  
  removeEntryPoint(index: number) {
    const entryPoints = this.engagementForm.get('entryPoints') as FormArray;
    if (index >= 0) {
      entryPoints.removeAt(index);
    }
  }
  
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
  
  validateMax20(c: FormControl) {
    if (c.value.length > 20) {
      return {max10: true};
    } else {
      return null;
    }
  }
  
}
