import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LpStartTutotialComponent } from './lp-start-tutotial.component';
import {MaterialModule} from "../../../app/material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LpStartTutorialModule} from "./lp-start-tutorial.module";
import {LpWebhooksConfigComponent} from "./lp-webhooks-config/lp-webhooks-config.component";
import {LpEnableAsycComponent} from "./lp-enable-asyc/lp-enable-asyc.component";
import {LpConfigCheckComponent} from "./lp-config-check/lp-config-check.component";
import {LpAppKeySecretComponent} from "./lp-app-key-secret/lp-app-key-secret.component";
import {ActivatedRoute, Router} from "@angular/router";
import {AccountConfigService} from "../../../app/core/services/account-config.service";
import {InstallationService} from "../../core/services/installation.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from "@angular/core";

describe('LpStartTutotialComponent', () => {
  let component: LpStartTutotialComponent;
  let fixture: ComponentFixture<LpStartTutotialComponent>;

  /*beforeEach(async(() => {
    const route = jasmine.createSpy( 'ActivatedRoute');
    const router = jasmine.createSpy( 'Router');
    const accounConfigService = jasmine.createSpy( 'AccounConfigService');
    const installationService = jasmine.createSpy( 'InstallationService');

    TestBed.configureTestingModule({
      imports: [MaterialModule, FormsModule, ReactiveFormsModule, BrowserAnimationsModule],
      declarations: [
        LpStartTutotialComponent,
        LpWebhooksConfigComponent,
        LpEnableAsycComponent,
        LpConfigCheckComponent,
        LpAppKeySecretComponent
      ],
      providers: [
        {provide: Router, useValue: router},
        {provide: ActivatedRoute, useValue: route},
        {provide: AccountConfigService, useValue: accounConfigService},
        {provide: InstallationService, useValue: installationService},
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LpStartTutotialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});


