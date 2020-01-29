import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {LpLoginComponent} from './lp-login.component';
import {ConversationService} from '../../core/services/conversation.service';
import {LoadingService} from '../../core/services/loading.service';
import {AccountConfigService} from '../../core/services/account-config.service';
import {DomainsService} from '../../core/services/domains.service';
import {InstallationService} from '../../core/services/installation.service';
import {AuthenticationService} from '../../core/services/authentication.service';
import {MatDialog} from '@angular/material';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {LpFooterComponent} from '../lp-footer/lp-footer.component';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from '../../material.module';


describe('LpLoginComponent', () => {
  let component: LpLoginComponent;
  let fixture: ComponentFixture<LpLoginComponent>;
  // MOCK
  const authenticationService = {
    userLoggedSubject: {
      subscribe: () => {
      }
    }
  };
  const conversationService = {
    conversation: {},
    conversationEventSubject: {
      subscribe: () => {
      }
    }
  };
  const installationService = {
    selectedApp: {
      client_id: 'XXX',
      client_secret: 'XXXX'
    }
  };
  const loadingService = {
    isLoadingSubscription: () => {
    }
  };
  
  const domainService = {
    domainsSubject: {
      subscribe: () => {
      }
    }
  };
  beforeEach(async(() => {
      TestBed.configureTestingModule({
          imports: [FormsModule, ReactiveFormsModule, MaterialModule, BrowserAnimationsModule, NoopAnimationsModule, RouterTestingModule],
          declarations: [LpLoginComponent, LpFooterComponent],
          providers: [
            FormBuilder,
            MatDialog,
            {provide: AuthenticationService, useValue: authenticationService},
            {provide: InstallationService, useValue: installationService},
            {provide: DomainsService, useValue: domainService},
            {provide: AccountConfigService, useValue: {}},
            {provide: LoadingService, useValue: loadingService},
            {provide: ConversationService, useValue: conversationService},
          
          ]
        })
        .compileComponents();
    }
  ))
  ;
  beforeEach(() => {
    fixture = TestBed.createComponent(LpLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
});

