import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LpAdvancedOptionsFormComponent } from './lp-advanced-options-form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../../../material.module";
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('LpAdvancedOptionsFormComponent', () => {
  let component: LpAdvancedOptionsFormComponent;
  let fixture: ComponentFixture<LpAdvancedOptionsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, MaterialModule],
      declarations: [ LpAdvancedOptionsFormComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LpAdvancedOptionsFormComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
