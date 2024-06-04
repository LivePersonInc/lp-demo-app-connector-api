import {async, TestBed} from '@angular/core/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {AppComponent} from './app.component';
import {LpHeaderModule} from './components/lp-header/lp-header.module';
import {MaterialModule} from './material.module';
import {LoadingService} from './core/services/loading.service';
import {LpDemoComponent} from './components/lp-demo/lp-demo.component';
import {LpConversationModule} from './components/lp-conversation/lp-conversation.module';
import {APP_BASE_HREF} from '@angular/common';
import {AuthenticationService} from './core/services/authentication.service';
import {LpLoginComponent} from './components/lp-login/lp-login.component';
import {LpAppInstallationsModule} from './components/lp-app-installations/lp-app-installations.module';
import {LpHomeModule} from './components/lp-home/lp-home.module';

describe('AppComponent', () => {
  beforeEach(async(() => {
    const authenticationService = jasmine.createSpy('AuthenticationService');

    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        LpDemoComponent,
        LpLoginComponent
      ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        LpHeaderModule,
        MaterialModule,
        LpConversationModule,
        LpAppInstallationsModule,
        LpHomeModule
      ],
      providers: [
        LoadingService,
        {provide: APP_BASE_HREF, useValue: '/'},
        {provide: AuthenticationService, useValue: authenticationService},
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

});
