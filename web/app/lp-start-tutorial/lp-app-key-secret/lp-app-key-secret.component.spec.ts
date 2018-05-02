import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LpAppKeySecretComponent } from './lp-app-key-secret.component';
import {MaterialModule} from "../../material.module";
import {InstallationService} from "../../core/services/istallation.service";
import {Router} from "@angular/router";

describe('LpAppKeySecretComponent', () => {
  let component: LpAppKeySecretComponent;
  let fixture: ComponentFixture<LpAppKeySecretComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule],
      declarations: [ LpAppKeySecretComponent],
      providers: [Router, InstallationService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LpAppKeySecretComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
