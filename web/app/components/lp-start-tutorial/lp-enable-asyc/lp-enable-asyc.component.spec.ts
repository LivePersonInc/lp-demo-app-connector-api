import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LpEnableAsycComponent } from './lp-enable-asyc.component';
import {MaterialModule} from "../../../material.module";
import {AccountConfigService} from "../../../core/services/account-config.service";
import {Router} from "@angular/router";
import {InstallationService} from "../../../core/services/istallation.service";
import {MatStepper} from "@angular/material";
import {StateStorage} from "../../../core/helpers/state-storage";
import {AuthenticationService} from "../../../core/services/authentication.service";

describe('LpEnableAsycComponent', () => {
  let component: LpEnableAsycComponent;
  let fixture: ComponentFixture<LpEnableAsycComponent>;

  beforeEach(async(() => {
    const accountConfigService = {
      acSubject: {
        subscribe: () => {}
      },
      getAccountConfigPropertiesList: () => {}
    };
    const installationService = jasmine.createSpy( 'InstallationService');
    const router = jasmine.createSpy( 'Router');
    const matStepper = jasmine.createSpy( 'MatStepper');
    const stateManager = jasmine.createSpy( 'StateStorage');
    const authenticationService = jasmine.createSpy( 'AuthenticationService');

    TestBed.configureTestingModule({
      imports: [MaterialModule],
      declarations: [ LpEnableAsycComponent ],
      providers: [
        {provide: AccountConfigService, useValue: accountConfigService},
        {provide: InstallationService, useValue: installationService},
        {provide: Router, useValue: router},
        {provide: MatStepper, useValue: matStepper},
        {provide: AuthenticationService, useValue: authenticationService},
        {provide: StateStorage, useValue: stateManager},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LpEnableAsycComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
