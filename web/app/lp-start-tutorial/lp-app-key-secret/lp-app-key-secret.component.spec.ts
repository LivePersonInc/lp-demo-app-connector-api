import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LpAppKeySecretComponent } from './lp-app-key-secret.component';
import {MaterialModule} from "../../material.module";
import {InstallationService} from "../../core/services/istallation.service";
import {Router} from "@angular/router";
import {MatStepper} from "@angular/material";
import {ChangeDetectorRef} from "@angular/core";

describe('LpAppKeySecretComponent', () => {
  let component: LpAppKeySecretComponent;
  let fixture: ComponentFixture<LpAppKeySecretComponent>;


  const installationService = {
    installationSubject: {
      subscribe: () => {}
    }
  };
  const router = jasmine.createSpy( 'Router');
  const changeDetectorRef = jasmine.createSpy( 'ChangeDetectorRef');

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule],
      declarations: [ LpAppKeySecretComponent],
      providers: [
        MatStepper,
        {provide: InstallationService, useValue: installationService},
        {provide: Router, useValue: router},
        {provide: ChangeDetectorRef, useValue: changeDetectorRef},


      ]
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
