import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LpDemoComponent } from './lp-demo.component';
import {MaterialModule} from "../../../app/material.module";
import {LpConversationModule} from "../../../app/components/lp-conversation/lp-conversation.module";
import {FormsModule} from "@angular/forms";
import {ConversationService} from "../../../app/core/services/conversation.service";
import {AuthenticationService} from "../../../app/core/services/authentication.service";
import {InstallationService} from "../../../app/core/services/istallation.service";
import {SendApiService} from "../../../app/core/services/send-api.service";
import {LoadingService} from "../../../app/core/services/loading.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('LpDemoComponent', () => {
 /* let component: LpDemoComponent;
  let fixture: ComponentFixture<LpDemoComponent>;

  const authenticationService = { //MOCK
    userLoggedSubject:{
      subscribe: () => {}
    }
  };
  const conversationService = {
    conversation: {},
    conversationEventSubject:{
      subscribe: () => {}
    }
  };
  const installationService = {
    selectedApp:{
      client_id: "XXX",
      client_secret: "XXXX"
    }
  };
  const loadingService = { //MOCK
    isLoadingSubscription:() => {}
  };
  const sendApiService = jasmine.createSpy( 'SendApiService');


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        LpConversationModule,
        BrowserAnimationsModule,
        FormsModule],
      declarations: [ LpDemoComponent, LpTestServicesComponent ],
      providers: [
        {provide: AuthenticationService, useValue: authenticationService},
        {provide: ConversationService, useValue: conversationService},
        {provide: InstallationService, useValue: installationService},
        {provide: SendApiService, useValue: sendApiService},
        {provide: LoadingService, useValue: loadingService},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LpDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
