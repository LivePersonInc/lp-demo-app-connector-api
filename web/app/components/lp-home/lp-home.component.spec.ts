import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MaterialModule} from '../../material.module';
import {AuthenticationService} from '../../core/services/authentication.service';
import {Router} from '@angular/router';
import {LpHomeComponent} from './lp-home.component';
import {InstallationService} from '../../core/services/installation.service';
import {LoadingService} from '../../core/services/loading.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('LpHomeComponent', () => {
  let component: LpHomeComponent;
  let fixture: ComponentFixture<LpHomeComponent>;
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
    },
    installationSubject: {
      subscribe: () => {
      
      }
    }
  };
  const loadingService = {
    isLoadingSubscription: () => {
    }
  };
  const router = jasmine.createSpy('Router');
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [MaterialModule, BrowserAnimationsModule],
        declarations: [LpHomeComponent],
        providers: [
          {provide: AuthenticationService, useValue: authenticationService},
          {provide: InstallationService, useValue: installationService},
          {provide: LoadingService, useValue: loadingService},
          {provide: Router, useValue: router}
        ]
      })
      .compileComponents();
  }));
  
  beforeEach(() => {
    fixture = TestBed.createComponent(LpHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('Should not modify any other property when the app is disabled/enabled', () => {
    
    // component.disableApp();
    
  });
});
