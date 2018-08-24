import { TestBed, async } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import {LpHeaderModule} from "./components/lp-header/lp-header.module";
import {MaterialModule} from "./material.module";
import {LoadingService} from "./core/services/loading.service";
import {LpHomeComponent} from "./components/lp-home/lp-home.component";
import {LpDemoComponent} from "./components/lp-demo/lp-demo.component";
import {LpStartTutorialModule} from "./components/lp-start-tutorial/lp-start-tutorial.module";
import {LpConversationModule} from "./components/lp-conversation/lp-conversation.module";
import {APP_BASE_HREF} from "@angular/common";
import {AuthenticationService} from "./core/services/authentication.service";
describe('AppComponent', () => {
  beforeEach(async(() => {
    const authenticationService = jasmine.createSpy('AuthenticationService');

    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        LpHomeComponent,
        LpDemoComponent,
      ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        LpHeaderModule,
        MaterialModule,
        LpStartTutorialModule,
        LpConversationModule,
      ],
      providers: [
        LoadingService,
        {provide: APP_BASE_HREF, useValue : '/' },
        {provide: AuthenticationService, useValue : authenticationService },
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

});
