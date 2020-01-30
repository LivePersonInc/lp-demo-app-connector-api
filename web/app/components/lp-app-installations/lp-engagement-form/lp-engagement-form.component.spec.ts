import {LpEngagementFormComponent} from './lp-engagement-form.component';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from '../../../material.module';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('LpEngagementFormComponent', () => {
  let component: LpEngagementFormComponent;
  let fixture: ComponentFixture<LpEngagementFormComponent>;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [LpEngagementFormComponent],
        imports: [
          FormsModule,
          ReactiveFormsModule,
          MaterialModule,
          BrowserAnimationsModule
        ],
        providers: [
          FormBuilder
        ],
        schemas: [NO_ERRORS_SCHEMA]
        
        
      })
      .compileComponents();
  }));
  
  beforeEach(() => {
    fixture = TestBed.createComponent(LpEngagementFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // Input()
    component.value = {
      design_engagement: false,
      design_window: true,
      entry_point: ['section'],
      visitor_behavior: ['flow'],
      target_audience: ['external_referral', 'search_keywords'],
      goal: ['url', 'purchase_total'],
      consumer_identity: ['auth'],
      language_selection: false
    };
    fixture.detectChanges();
  });
  
  it('should create component', () => {
    expect(component).toBeTruthy();
  });
  
})
;
