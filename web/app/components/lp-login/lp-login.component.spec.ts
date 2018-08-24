import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LpLoginComponent } from './lp-login.component';
import {MaterialModule} from "../../material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";

describe('LpLoginComponent', () => {
  let component: LpLoginComponent;
  let fixture: ComponentFixture<LpLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, MaterialModule, BrowserAnimationsModule,NoopAnimationsModule],
      declarations: [ LpLoginComponent ]
    })
      .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(LpLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

