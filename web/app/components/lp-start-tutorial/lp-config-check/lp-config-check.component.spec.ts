import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LpConfigCheckComponent } from './lp-config-check.component';
import {MaterialModule} from "../../../material.module";
import {FormsModule} from "@angular/forms";
import {AccountConfigService} from "../../../core/services/account-config.service";
import {InstallationService} from "../../../core/services/istallation.service";

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
      declarations: [ LpConfigCheckComponent ],
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
