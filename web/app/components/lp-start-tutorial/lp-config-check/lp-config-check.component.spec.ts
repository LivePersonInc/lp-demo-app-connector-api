import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LpConfigCheckComponent } from './lp-config-check.component';
import {MaterialModule} from "../../../material.module";
import {FormsModule} from "@angular/forms";
import {AccountConfigService} from "../../../core/services/account-config.service";
import {InstallationService} from "../../../core/services/installation.service";
import {LpWebhooksInfoComponent} from "../../lp-app-installations/lp-webhooks-info/lp-webhooks-info.component";

describe('LpConfigCheckComponent', () => {
  let component: LpConfigCheckComponent;
  let fixture: ComponentFixture<LpConfigCheckComponent>;

  beforeEach(async(() => {
    const installationService = { //MOCK
      installationSubject: {
        subscribe: () => {}
      }
    };
    const accountConfigService = { //MOCK
      acSubject: {
        subscribe: () => {
        }
      }
    };
    TestBed.configureTestingModule({
      imports:[MaterialModule, FormsModule],
      declarations: [ LpConfigCheckComponent, LpWebhooksInfoComponent ],
      providers: [
        {provide: AccountConfigService, useValue: accountConfigService},
        {provide: InstallationService, useValue: installationService}

      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LpConfigCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
