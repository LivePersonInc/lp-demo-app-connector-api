import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LpHomeComponent } from './lp-home.component';
import {MaterialModule} from "../material.module";
import {LpConfigCheckComponent} from "../lp-start-tutorial/lp-config-check/lp-config-check.component";
import {FormBuilder, FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthenticationService} from "../core/services/authentication.service";
import {InstallationService} from "../core/services/istallation.service";
import {ConversationService} from "../core/services/conversation.service";
import {MatDialog, MatDialog} from "@angular/material";
import {Router} from "@angular/router";
import {DomainsService} from "../core/services/domains.service";
import {AccountConfigService} from "../core/services/account-config.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('LpHomeComponent', () => {
  let component: LpHomeComponent;
  let fixture: ComponentFixture<LpHomeComponent>;

 /* beforeEach(async(() => {
    const authenticationService = { //MOCK
      userLoggedSubject:{
        subscribe: () => {}
      }
    };
    const formBuilder = {
      group: () => {
        return new FormControl();
      }
    };
    const installationService = jasmine.createSpy( 'InstallationService');
    const conversationService = jasmine.createSpy( 'ConversationService');
    const accountConfigService = jasmine.createSpy('AccountConfigService');
    const domainsService = jasmine.createSpy( 'DomainsService');
    const router = jasmine.createSpy( 'Router');
    const matDialog = jasmine.createSpy( 'MatDialog');
    TestBed.configureTestingModule({
      imports: [MaterialModule, FormsModule, ReactiveFormsModule, BrowserAnimationsModule],
      declarations: [ LpHomeComponent, LpConfigCheckComponent ],
      providers: [
        {provide: AuthenticationService, useValue: authenticationService},
        {provide: InstallationService, useValue: installationService},
        {provide: ConversationService, useValue: conversationService},
        {provide: AccountConfigService, useValue: accountConfigService},
        {provide: DomainsService, useValue: domainsService},
        {provide: Router, useValue: router},
        {provide: FormBuilder, useValue: formBuilder},
        {provide: MatDialog, useValue: matDialog},
      ]
    });
    component = TestBed.get(LpHomeComponent);
    //.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LpHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });*/

  beforeEach(() => {
    component = new LpHomeComponent(
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
