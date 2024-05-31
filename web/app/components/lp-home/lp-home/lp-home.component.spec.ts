import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MaterialModule} from '../../../material.module';
import {AuthenticationService} from '../../../core/services/authentication.service';
import {Router} from '@angular/router';
import {LpHomeComponent} from './lp-home.component';
import {InstallationService} from '../../../core/services/installation.service';
import {LoadingService} from '../../../core/services/loading.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import appInstallationJson from '../../../shared/mocks/appInstallation.json';
import {AppInstall} from '../../../shared/models/app-installation/appInstall.model';
import {InstallationServiceStub} from '../../../shared/mocks/installation.service.mock';

describe('LpHomeComponent', () => {
  let component: LpHomeComponent;
  let fixture: ComponentFixture<LpHomeComponent>;
  let appInstallation: AppInstall;

  appInstallation = new AppInstall().deserialize(appInstallationJson);

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
  const loadingService = {
    isLoadingSubscription: () => {
    },
    startLoading: () => {
    }
  };
  const router = jasmine.createSpy('Router');

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [MaterialModule, BrowserAnimationsModule],
        declarations: [LpHomeComponent],
        providers: [
          {provide: InstallationService, useClass: InstallationServiceStub},
          {provide: AuthenticationService, useValue: authenticationService},
          {provide: authenticationService},
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

  it('Should not modify the appInstallation passed object after diabled', () => {
    expect(appInstallation.enabled).toEqual(true);
    component.disableApp(appInstallation);
    expect(appInstallation.enabled).toEqual(true);
  });

  it('Should receive UPDATE_APP event when disabled', async () => {
    let eventRecived = null;

    component.installationService.installationSubject.subscribe(event => {
      if (event === 'UPDATE_APP') {
        eventRecived = event;
      }

    });
    expect(appInstallation.enabled).toEqual(true);
    component.disableApp(appInstallation);
    expect(appInstallation.enabled).toEqual(true);

    expect(eventRecived).toEqual('UPDATE_APP');

  });

  it('Should not modify the appInstallation passed object after enable an app', () => {
    appInstallation.enabled = false;
    expect(appInstallation.enabled).toEqual(false);
    component.enableApp(appInstallation);
    expect(appInstallation.enabled).toEqual(false);
    appInstallation.enabled = true;
  });

  /*it('Should call openDemo when ' , () => {

  });*/


});
