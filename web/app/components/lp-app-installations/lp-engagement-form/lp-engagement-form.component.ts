import {Component, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

@Component({
  selector: 'lp-engagement-form',
  templateUrl: './lp-engagement-form.component.html',
  styleUrls: ['./lp-engagement-form.component.scss']
})
export class LpEngagementFormComponent implements OnInit {
  public engagementForm: FormGroup;
  public designEngagement = false;
  public designWindow = false;
  public languageSelection = false;
  public defaultEntryPoints = ['url', 'section'];
  
  @ViewChild('entryPointChipList', {static: true}) entryPointChipList;
  
  // chip input props.
  public selectable = true;
  public removable = true;
  public addOnBlur = true;
  public readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  
  constructor(private fb: FormBuilder) {
    this.engagementForm = this.fb.group({
      entryPoints: this.fb.array(this.defaultEntryPoints, [this.validateRequired, this.validateMax10]),
    });
  }
  
  ngOnInit() {
    this.engagementForm.get('entryPoints').statusChanges.subscribe(
      status => this.entryPointChipList.errorState = status === 'INVALID'
    );
    
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
  
  /* Handle form errors in Angular 8 */
  public errorHandling = (control: string, error: string) => {
    return this.engagementForm.controls[control].hasError(error);
  }
  
}
